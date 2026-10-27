import { Injectable } from '@nestjs/common';
import { DeleteDocumentCommand } from './delete-document.command';
import { DocumentReader } from '../../domain/ports/document-reader.port';
import { DocumentWriter } from '../../domain/ports/document-writer.port';
import { StorageDeleter } from '../../domain/ports/storage-deleter.port';
import { DocumentId } from '@amt-assistant/domain';
import { NotFoundException } from '@amt-assistant/exceptions';

@Injectable()
export class DeleteDocumentUseCase {
  constructor(
    private readonly documentReader: DocumentReader,
    private readonly documentWriter: DocumentWriter,
    private readonly storageDeleter: StorageDeleter,
  ) {}

  async execute(command: DeleteDocumentCommand): Promise<void> {
    const documentId = DocumentId.create(command.id);
    const document = await this.documentReader.findById(documentId);

    if (!document || document.userId.getValue() !== command.userId) {
      throw new NotFoundException(`Document with ID ${command.id} not found`);
    }

    await this.storageDeleter.deleteFile(document.path);
    await this.documentWriter.delete(documentId);
  }
}
