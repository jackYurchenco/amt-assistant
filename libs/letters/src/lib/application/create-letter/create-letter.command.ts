export class CreateLetterCommand {
  constructor(
    public readonly title: string,
    public readonly userId: string,
    public readonly sender?: string,
  ) {}
}
