import { ApplicationException } from '@amt-assistant/exceptions';

export class InvalidCredentialsException extends ApplicationException {
  constructor() {
    super('Invalid credentials');
  }
}
