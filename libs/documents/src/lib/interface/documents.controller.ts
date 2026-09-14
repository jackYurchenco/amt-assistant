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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@amt-assistant/auth';
import { AuthenticatedUserId } from '@amt-assistant/util-decorators';
import { UploadDocumentUseCase } from '../application/upload-document/upload-document.use-case';
import { UploadDocumentCommand } from '../application/upload-document/upload-document.command';
import { GetDocumentByIdUseCase } from '../application/get-document-by-id/get-document-by-id.use-case';
import { GetDocumentByIdQuery } from '../application/get-document-by-id/get-document-by-id.query';
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
  async findOne(@Param() dto: GetDocumentByIdDto): Promise<DocumentResponseDto> {
    const document = await this.getDocumentByIdUseCase.execute(
      new GetDocumentByIdQuery(dto.id),
    );
    return DocumentResponseDto.fromEntity(document);
  }
}
