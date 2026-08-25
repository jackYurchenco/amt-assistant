import { Document as PrismaDocument } from '@prisma/client';
import { DocumentStatus } from '@amt-assistant/contracts';
import { Document } from '../../domain/document.entity';

export class DocumentMapper {
  static toDomain(prismaDoc: PrismaDocument): Document {
    return Document.restore({
      id: prismaDoc.id,
      userId: prismaDoc.userId,
      originalName: prismaDoc.originalName,
      filename: prismaDoc.filename,
      path: prismaDoc.path,
      mimeType: prismaDoc.mimeType,
      size: prismaDoc.size,
      status: prismaDoc.status as DocumentStatus,
      createdAt: prismaDoc.createdAt,
      updatedAt: prismaDoc.updatedAt,
    });
  }

  static toPersistence(domainDoc: Document): Omit<PrismaDocument, 'createdAt' | 'updatedAt'> {
    return {
      id: domainDoc.id.getValue(),
      originalName: domainDoc.originalName,
      filename: domainDoc.filename,
      path: domainDoc.path,
      mimeType: domainDoc.mimeType,
      size: domainDoc.size,
      status: domainDoc.status,
      userId: domainDoc.userId.getValue(),
    };
  }
}
