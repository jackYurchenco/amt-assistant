import { Email, UserId } from '@amt-assistant/domain';

export class User {
  private constructor(
    public readonly id: UserId,
    public readonly email: Email,
    public readonly passwordHash: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly firstName?: string | null,
    public readonly lastName?: string | null,
  ) {
  }
  static create(props: {
    email: string,
    passwordHash: string,
  }): User {
    const now = new Date();
    return new User(
      UserId.generate(),
      Email.create(props.email),
      props.passwordHash,
      now,
      now,
      null,
      null,
    );
  }

  static restore(props: {
    id: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date
    firstName: string | null,
    lastName: string | null,
  }): User {
    return new User(
      UserId.create(props.id),
      Email.create(props.email),
      props.passwordHash,
      props.createdAt,
      props.updatedAt,
      props.firstName,
      props.lastName,
    );
  }
}
