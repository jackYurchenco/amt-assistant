import { ApplicationException } from '@amt-assistant/exceptions';

export class LetterNotFoundException extends ApplicationException {
  constructor(message = 'Letter not found.') {
    super(message);
  }
}
