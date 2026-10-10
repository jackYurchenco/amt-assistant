export class UpdateDocumentCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly originalName: string,
  ) {}
}
