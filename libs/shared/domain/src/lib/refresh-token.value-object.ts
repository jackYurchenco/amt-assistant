import { BaseValueObject } from './base.value-object';

export class RefreshToken extends BaseValueObject<string, 'RefreshToken'> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): RefreshToken {
    if (!value || value.trim().length === 0) {
      throw new Error('Refresh token cannot be empty');
    }

    return new RefreshToken(value);
  }
}
