import { ApplicationException } from '@amt-assistant/exceptions';

export class UserNotFoundException extends ApplicationException {
  constructor(message = 'User not found.') {
    super(message);
  }
}
