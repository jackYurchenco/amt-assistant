import { Email, PasswordHash, UserId } from '@amt-assistant/domain';

export class User {
  private constructor(
    public readonly id: UserId,
    public readonly email: Email,
    public readonly passwordHash: PasswordHash,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly firstName?: string | null,
    public readonly lastName?: string | null,
  ) {
  }
  static create(props: {
    email: Email,
    passwordHash: PasswordHash,
  }): User {
    const now = new Date();
    return new User(
      UserId.generate(),
      props.email,
      props.passwordHash,
      now,
      now,
      null,
      null,
    );
  }

  static restore(props: {
    id: UserId;
    email: Email;
    passwordHash: PasswordHash;
    createdAt: Date;
    updatedAt: Date
    firstName: string | null,
    lastName: string | null,
  }): User {
    return new User(
      props.id,
      props.email,
      props.passwordHash,
      props.createdAt,
      props.updatedAt,
      props.firstName,
      props.lastName,
    );
  }
}
