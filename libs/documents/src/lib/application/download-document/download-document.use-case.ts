import { Injectable } from '@nestjs/common';
import { DownloadDocumentCommand } from './download-document.command';
import { DownloadDocumentResult } from './download-document.result';
import { DocumentReader } from '../../domain/ports/document-reader.port';
import { StorageReader } from '../../domain/ports/storage-reader.port';
import { DocumentId } from '@amt-assistant/domain';
import { NotFoundException } from '@amt-assistant/exceptions';

@Injectable()
export class DownloadDocumentUseCase {
  constructor(
    private readonly documentReader: DocumentReader,
    private readonly storageReader: StorageReader,
  ) {}

  async execute(command: DownloadDocumentCommand): Promise<DownloadDocumentResult> {
    const documentId = DocumentId.create(command.id);
    const document = await this.documentReader.findById(documentId);

    if (!document || document.userId.getValue() !== command.userId) {
      throw new NotFoundException(`Document with ID ${command.id} not found`);
    }

    const buffer = await this.storageReader.getFile(document.path);

    return new DownloadDocumentResult(document, buffer);
  }
}
