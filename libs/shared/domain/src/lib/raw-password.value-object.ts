import { BaseValueObject } from './base.value-object';
import { BadRequestException } from '@nestjs/common';

export class RawPassword extends BaseValueObject<string, 'RawPassword'> {
  public static create(password: string): RawPassword {
    if (!password || password.trim() === '') {
      throw new BadRequestException('The password cannot be empty');
    }

    if (password.length > 64) {
      throw new BadRequestException('The password cannot be longer than 64 characters');
    }

    if (password.length < 6) {
      throw new BadRequestException('The password must be at least 6 characters long.');
    }

    return new RawPassword(password);
  }
}
