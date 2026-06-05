export class AuthUser {
  private constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly passwordHash: string,
  ) {}

  static create(props: { id: string; email: string; passwordHash: string }): AuthUser {
    return new AuthUser(props.id, props.email, props.passwordHash);
  }

  static restore(props: { id: string; email: string; passwordHash: string }): AuthUser {
    return new AuthUser(props.id, props.email, props.passwordHash);
  }
}
