import { Document } from '../document.entity';

export abstract class DocumentWriter {
  abstract save(document: Document): Promise<Document>;
}
