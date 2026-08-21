import { Injectable } from '@nestjs/common';
import { ApplicationValidationException } from '@amt-assistant/exceptions';
import { UploadDocumentCommand } from './upload-document.command';
import { Document } from '../../domain/document.entity';
import { DocumentWriter } from '../../domain/ports/document-writer.port';
import { StorageWriter } from '../../domain/ports/storage-writer.port';
import { randomUUID } from 'crypto';
import * as path from 'path';

@Injectable()
export class UploadDocumentUseCase {
  constructor(
    private readonly documentWriter: DocumentWriter,
    private readonly storagePort: StorageWriter,
  ) {}

  async execute(command: UploadDocumentCommand): Promise<Document> {
    if (!command.fileBuffer || command.size === 0) {
      throw new ApplicationValidationException('File is required');
    }

    if (command.mimeType !== 'application/pdf') {
      throw new ApplicationValidationException('Only PDF files are allowed');
    }

    const ext = path.extname(command.originalName);
    const uniqueFilename = `${randomUUID()}${ext}`;

    const savedPath = await this.storagePort.saveFile(uniqueFilename, command.fileBuffer);

    const document = Document.create({
      userId: command.userId,
      originalName: command.originalName,
      filename: uniqueFilename,
      path: savedPath,
      mimeType: command.mimeType,
      size: command.size,
    });

    return this.documentWriter.save(document);
  }
}
