import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@amt-assistant/auth';
import { AuthenticatedUserId } from '@amt-assistant/util-decorators';
import { UploadDocumentUseCase } from '../application/upload-document/upload-document.use-case';
import { UploadDocumentCommand } from '../application/upload-document/upload-document.command';
import { DocumentResponseDto } from './dto/document-response.dto';
import 'multer'; // Ensure Express.Multer.File is available

@Controller('documents')
export class DocumentsController {
  constructor(private readonly uploadDocumentUseCase: UploadDocumentUseCase) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
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
}
