import { ApplicationException } from '@amt-assistant/exceptions';

export class InvalidTokenException extends ApplicationException {
  constructor(message = 'User is not authorized or token is invalid.') {
    super(message);
  }
}
