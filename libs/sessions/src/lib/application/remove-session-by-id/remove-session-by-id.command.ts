export class RemoveSessionByIdCommand {
  constructor(
    public readonly sessionId: string,
    public readonly userId: string,
  ) {}
}
