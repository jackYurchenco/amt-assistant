import { ApplicationException } from '@amt-assistant/exceptions';

export class SessionNotFoundException extends ApplicationException {
  constructor(message = 'Session not found.') {
    super(message);
  }
}
