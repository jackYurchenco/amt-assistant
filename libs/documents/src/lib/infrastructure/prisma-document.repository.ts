import { Injectable } from '@nestjs/common';
import { PrismaService } from '@amt-assistant/prisma';
import { DocumentId } from '@amt-assistant/domain';
import { DocumentWriter } from '../domain/ports/document-writer.port';
import { DocumentReader } from '../domain/ports/document-reader.port';
import { Document } from '../domain/document.entity';
import { DocumentMapper } from './mappers/document.mapper';
import { DatabaseOperationException } from '@amt-assistant/exceptions';
import { Document as PrismaDocument } from '@prisma/client';

@Injectable()
export class PrismaDocumentRepository implements DocumentWriter, DocumentReader {
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

  async findById(id: DocumentId): Promise<Document | null> {
    try {
      const raw: PrismaDocument | null = await this.prisma.document.findUnique({
        where: { id: id.getValue() },
      });

      return raw ? DocumentMapper.toDomain(raw) : null;
    } catch {
      throw new DatabaseOperationException('Failed to find document by ID in the database');
    }
  }
}
