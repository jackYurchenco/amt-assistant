export class RefreshToken {
  private constructor(public readonly value: string) {}

  static create(value: string): RefreshToken {
    if (!value || value.trim().length === 0) {
      throw new Error('Refresh token cannot be empty');
    }

    return new RefreshToken(value);
  }
}
