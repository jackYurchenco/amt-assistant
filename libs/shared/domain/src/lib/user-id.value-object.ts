import { v4 as uuidv4, validate } from 'uuid';

export class UserId {
  private constructor(private readonly value: string) {}

  static create(id: string): UserId {
    if (!id) {
      throw new Error('UserId cannot be empty');
    }

    if (!validate(id)) {
      throw new Error(`Invalid UserId format: ${id}. Expected UUID v4.`);
    }

    return new UserId(id);
  }

  static generate(): UserId {
    return new UserId(uuidv4());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserId | null | undefined): boolean {
    return this.value === other?.getValue();
  }
}
