import { InfrastructureException } from '../base/infrastructure.exception';

export class DatabaseOperationException extends InfrastructureException {
  constructor(message: string) {
    super(`Database operation failed: ${message}`);
  }
}
