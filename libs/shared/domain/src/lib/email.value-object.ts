export class Email {
  private constructor(private readonly value: string) {}

  public static create(email: string): Email {
    if (!email) {
      throw new Error('Email cannot be empty');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(`Invalid email format: ${email}`);
    }

    return new Email(email.toLowerCase().trim());
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Email | null | undefined): boolean {
    return !!other && this.value === other.getValue();
  }
}
