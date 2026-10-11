import { Injectable } from '@nestjs/common';
import { UpdateDocumentCommand } from './update-document.command';
import { DocumentReader } from '../../domain/ports/document-reader.port';
import { DocumentWriter } from '../../domain/ports/document-writer.port';
import { DocumentId } from '@amt-assistant/domain';
import { NotFoundException } from '@amt-assistant/exceptions';
import { Document } from '../../domain/document.entity';

@Injectable()
export class UpdateDocumentUseCase {
  constructor(
    private readonly documentReader: DocumentReader,
    private readonly documentWriter: DocumentWriter,
  ) {}

  async execute(command: UpdateDocumentCommand): Promise<Document> {
    const documentId = DocumentId.create(command.id);
    const document = await this.documentReader.findById(documentId);

    if (!document || document.userId.getValue() !== command.userId) {
      throw new NotFoundException(`Document with ID ${command.id} not found`);
    }

    document.rename(command.originalName);
    
    return this.documentWriter.save(document);
  }
}
