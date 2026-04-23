import { v4 as uuidv4, validate } from 'uuid';
import { BaseValueObject } from './base.value-object';

export abstract class EntityId<T extends string> extends BaseValueObject<string, T> {
  protected constructor(value: string) {
    super(value);
    this.validate(value);
  }

  private validate(id: string): void {
    if (!id) {
      throw new Error(`${this.constructor.name} cannot be empty`);
    }

    if (!validate(id)) {
      throw new Error(`Invalid ${this.constructor.name} format: ${id}. Expected UUID v4.`);
    }
  }

  protected static generateValue(): string {
    return uuidv4();
  }
}
