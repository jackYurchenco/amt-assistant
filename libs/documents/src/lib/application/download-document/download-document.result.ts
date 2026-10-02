import { Document } from '../../domain/document.entity';

export class DownloadDocumentResult {
  constructor(
    public readonly document: Document,
    public readonly buffer: Buffer,
  ) {}
}
