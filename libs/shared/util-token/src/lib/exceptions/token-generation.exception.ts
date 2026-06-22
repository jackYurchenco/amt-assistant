import { InfrastructureException } from '@amt-assistant/exceptions';

export class TokenGenerationException extends InfrastructureException {
  constructor(message: string) {
    super(`Failed to generate tokens: ${message}`);
  }
}
