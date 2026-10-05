import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  StreamableFile,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@amt-assistant/auth';
import { AuthenticatedUserId } from '@amt-assistant/util-decorators';
import { UploadDocumentUseCase } from '../application/upload-document/upload-document.use-case';
import { UploadDocumentCommand } from '../application/upload-document/upload-document.command';
import { GetDocumentByIdUseCase } from '../application/get-document-by-id/get-document-by-id.use-case';
import { GetDocumentByIdQuery } from '../application/get-document-by-id/get-document-by-id.query';
import { GetDocumentsByUserIdUseCase } from '../application/get-documents-by-user-id/get-documents-by-user-id.use-case';
import { GetDocumentsByUserIdQuery } from '../application/get-documents-by-user-id/get-documents-by-user-id.query';
import { DownloadDocumentUseCase } from '../application/download-document/download-document.use-case';
import { DownloadDocumentCommand } from '../application/download-document/download-document.command';
import { GetDocumentByIdDto } from './dto/get-document-by-id.dto';
import { DocumentResponseDto } from './dto/document-response.dto';
import { DocumentsExceptionFilter } from '../infrastructure/filters/documents-exception.filter';
import 'multer'; // Ensure Express.Multer.File is available

@ApiTags('documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseFilters(DocumentsExceptionFilter)
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly uploadDocumentUseCase: UploadDocumentUseCase,
    private readonly getDocumentByIdUseCase: GetDocumentByIdUseCase,
    private readonly getDocumentsByUserIdUseCase: GetDocumentsByUserIdUseCase,
    private readonly downloadDocumentUseCase: DownloadDocumentUseCase,
  ) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a new document' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The document has been successfully uploaded.',
    type: DocumentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @AuthenticatedUserId() userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<DocumentResponseDto> {
    const command = new UploadDocumentCommand(
      userId,
      file.buffer,
      file.originalname,
      file.mimetype,
      file.size,
    );

    const document = await this.uploadDocumentUseCase.execute(command);
    return DocumentResponseDto.fromEntity(document);
  }

  @Get()
  @ApiOperation({ summary: 'Get all documents for the current user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of documents retrieved successfully',
    type: [DocumentResponseDto],
  })
  async findAllByUser(
    @AuthenticatedUserId() userId: string,
  ): Promise<DocumentResponseDto[]> {
    const documents = await this.getDocumentsByUserIdUseCase.execute(
      new GetDocumentsByUserIdQuery(userId),
    );
    return documents.map((document) => DocumentResponseDto.fromEntity(document));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific document by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Document found successfully',
    type: DocumentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Document not found',
  })
  async findOne(
    @Param() dto: GetDocumentByIdDto,
    @AuthenticatedUserId() userId: string,
  ): Promise<DocumentResponseDto> {
    const document = await this.getDocumentByIdUseCase.execute(
      new GetDocumentByIdQuery(dto.id, userId),
    );
    return DocumentResponseDto.fromEntity(document);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Download a specific document' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Document file stream',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Document not found',
  })
  async download(
    @Param() dto: GetDocumentByIdDto,
    @AuthenticatedUserId() userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { document, buffer } = await this.downloadDocumentUseCase.execute(
      new DownloadDocumentCommand(dto.id, userId),
    );

    res.set({
      'Content-Type': document.mimeType,
      'Content-Disposition': `attachment; filename="${document.originalName}"`,
      'Content-Length': document.size,
    });

    return new StreamableFile(buffer);
  }
}
