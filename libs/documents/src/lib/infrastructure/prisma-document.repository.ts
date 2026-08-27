import { Injectable } from '@nestjs/common';
import { PrismaService } from '@amt-assistant/prisma';
import { DocumentWriter } from '../domain/ports/document-writer.port';
import { Document } from '../domain/document.entity';
import { DocumentMapper } from './mappers/document.mapper';
import { DatabaseOperationException } from '@amt-assistant/exceptions';

@Injectable()
export class PrismaDocumentRepository implements DocumentWriter {
  constructor(private readonly prisma: PrismaService) {}

  async save(document: Document): Promise<Document> {
    const data = DocumentMapper.toPersistence(document);

    try {
      const saved = await this.prisma.document.upsert({
        where: { id: document.id.getValue() },
        create: data,
        update: data,
      });

      return DocumentMapper.toDomain(saved);
    } catch {
      throw new DatabaseOperationException('Failed to save document in the database');
    }
  }
}
