import { InfrastructureException } from '@amt-assistant/exceptions';

export class TokenVerificationException extends InfrastructureException {
  constructor(message = 'Failed to verify token') {
    super(message);
  }
}
