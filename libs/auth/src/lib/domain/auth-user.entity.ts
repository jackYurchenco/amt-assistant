import { UserId, Email, PasswordHash } from '@amt-assistant/domain';

export class AuthUser {
  private constructor(
    public readonly id: UserId,
    public readonly email: Email,
    public readonly passwordHash: PasswordHash,
  ) {}

  static create(props: { id: string; email: string; passwordHash: string }): AuthUser {
    return new AuthUser(
      UserId.create(props.id),
      Email.create(props.email),
      PasswordHash.create(props.passwordHash),
    );
  }

  static restore(props: { id: string; email: string; passwordHash: string }): AuthUser {
    return new AuthUser(
      UserId.create(props.id),
      Email.create(props.email),
      PasswordHash.create(props.passwordHash),
    );
  }
}
