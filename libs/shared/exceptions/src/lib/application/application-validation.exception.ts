import { ApplicationException } from '../base/application.exception';

export class ApplicationValidationException extends ApplicationException {
  constructor(message: string) {
    super(message);
  }
}
