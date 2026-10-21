import { DocumentId } from '@amt-assistant/domain';
import { Document } from '../document.entity';

export abstract class DocumentWriter {
  abstract save(document: Document): Promise<Document>;
  abstract delete(id: DocumentId): Promise<void>;
}
