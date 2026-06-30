export class CreateSessionCommand {
  constructor(
    public readonly userId: string,
    public readonly refreshToken: string,
    public readonly userAgent?: string,
  ) {}
}
