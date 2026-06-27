import { DomainException } from '../base/domain.exception';

export class DomainValidationException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
