export class FindSessionByTokenCommand {
  public readonly token: string;

  constructor(props: FindSessionByTokenCommand) {
    this.token = props.token;
  }
}
