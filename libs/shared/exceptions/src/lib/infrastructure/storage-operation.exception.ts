import { InfrastructureException } from '../base/infrastructure.exception';

export class StorageOperationException extends InfrastructureException {
  constructor(message = 'Storage operation failed') {
    super(message);
  }
}
