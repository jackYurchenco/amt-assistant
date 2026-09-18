import { Injectable } from '@nestjs/common';
import { UserId } from '@amt-assistant/domain';
import { Document } from '../../domain/document.entity';
import { DocumentReader } from '../../domain/ports/document-reader.port';
import { GetDocumentsByUserIdQuery } from './get-documents-by-user-id.query';

@Injectable()
export class GetDocumentsByUserIdUseCase {
  constructor(private readonly documentReader: DocumentReader) {}

  async execute(query: GetDocumentsByUserIdQuery): Promise<Document[]> {
    return this.documentReader.findByUserId(UserId.create(query.userId));
  }
}
