import { BaseValueObject } from './base.value-object';
import { DomainValidationException } from '@amt-assistant/exceptions';

export class Email extends BaseValueObject<string, 'Email'> {
  private constructor(value: string) {
    super(value);
  }

  public static create(email: string): Email {
    if (!email) {
      throw new DomainValidationException('Email cannot be empty');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new DomainValidationException(`Invalid email format: ${email}`);
    }

    return new Email(email.toLowerCase().trim());
  }
}
