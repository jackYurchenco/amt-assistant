import { DocumentId } from '@amt-assistant/domain';
import { Document } from '../document.entity';

export abstract class DocumentReader {
  abstract findById(id: DocumentId): Promise<Document | null>;
}