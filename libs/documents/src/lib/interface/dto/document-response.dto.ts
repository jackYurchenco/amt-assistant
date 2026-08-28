import { Document } from '../../domain/document.entity';
import { IDocument, DocumentStatus } from '@amt-assistant/contracts';

export class DocumentResponseDto implements IDocument {
  id!: string;
  originalName!: string;
  filename!: string;
  path!: string;
  mimeType!: string;
  size!: number;
  status!: DocumentStatus;
  userId!: string;
  createdAt?: Date;
  updatedAt?: Date;

  static fromEntity(entity: Document): DocumentResponseDto {
    const dto = new DocumentResponseDto();
    dto.id = entity.id.getValue();
    dto.originalName = entity.originalName;
    dto.filename = entity.filename;
    dto.path = entity.path;
    dto.mimeType = entity.mimeType;
    dto.size = entity.size;
    dto.status = entity.status;
    dto.userId = entity.userId.getValue();
    if (entity.createdAt) {
      dto.createdAt = entity.createdAt;
    }
    if (entity.updatedAt) {
      dto.updatedAt = entity.updatedAt;
    }
    return dto;
  }
}
