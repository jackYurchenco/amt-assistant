export class GetDocumentByIdQuery {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
