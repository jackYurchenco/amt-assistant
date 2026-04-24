import { BaseValueObject } from './base.value-object';

export class PasswordHash extends BaseValueObject<string, 'PasswordHash'> {
  private constructor(value: string) {
    super(value);
  }

  public static create(hash: string): PasswordHash {
    if (!hash || hash.trim() === '') {
      throw new Error('Password hash cannot be empty');
    }

    return new PasswordHash(hash);
  }
}
