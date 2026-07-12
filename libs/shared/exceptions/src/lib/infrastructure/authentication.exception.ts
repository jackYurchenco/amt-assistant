import { InfrastructureException } from '../base/infrastructure.exception';

export class AuthenticationException extends InfrastructureException {
  constructor(message = 'Authentication failed') {
    super(message);
  }
}
