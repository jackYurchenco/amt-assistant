import { ApplicationException } from '@amt-assistant/exceptions';

export class SessionForbiddenException extends ApplicationException {
  constructor(message = 'You are not allowed to perform this action on this session.') {
    super(message);
  }
}
