import { Injectable } from '@nestjs/common';
import { GetDocumentByIdQuery } from './get-document-by-id.query';
import { Document } from '../../domain/document.entity';
import { DocumentId } from '@amt-assistant/domain';
import { DocumentReader } from '../../domain/ports/document-reader.port';
import { NotFoundException } from '@amt-assistant/exceptions';

@Injectable()
export class GetDocumentByIdUseCase {
  constructor(private readonly documentReader: DocumentReader) {}

  async execute(query: GetDocumentByIdQuery): Promise<Document> {
    const document = await this.documentReader.findById(DocumentId.create(query.id));

    if (!document) {
      throw new NotFoundException(`Document with ID ${query.id} not found`);
    }

    return document;
  }
}
