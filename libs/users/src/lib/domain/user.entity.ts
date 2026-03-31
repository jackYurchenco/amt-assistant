import { v4 as uuidv4 } from "uuid";

export class User {
  private constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly firstName?: string | null,
    public readonly lastName?: string | null,
  ) {
    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }
  }
  static create(props: {
    email: string,
    passwordHash: string,
  }): User {
    const now = new Date();
    return new User(
      uuidv4(),
      props.email,
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
