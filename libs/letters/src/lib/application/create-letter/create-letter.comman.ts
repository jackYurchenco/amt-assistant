export class CreateLetterCommand {
  constructor(
    public readonly title: string,
    public readonly sender?: string,
  ) {}
}
