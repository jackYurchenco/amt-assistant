export class UploadDocumentCommand {
  constructor(
    public readonly userId: string,
    public readonly fileBuffer: Buffer,
    public readonly originalName: string,
    public readonly mimeType: string,
    public readonly size: number,
  ) {}
}
