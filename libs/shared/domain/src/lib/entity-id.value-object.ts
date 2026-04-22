import { v4 as uuidv4, validate } from 'uuid';

export abstract class EntityId {
  protected constructor(protected readonly value: string) {
    this.validate(value);
  }

  private validate(id: string): void {
    if (!id) {
      throw new Error('UserId cannot be empty');
    }

    if (!validate(id)) {
      throw new Error(`Invalid UserId format: ${id}. Expected UUID v4.`);
    }
  }

  protected static generateValue(): string {
    return uuidv4();
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: EntityId | null | undefined): boolean {
    return this.value === other?.getValue();
  }
}
