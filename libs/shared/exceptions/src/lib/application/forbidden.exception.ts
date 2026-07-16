import { ApplicationException } from '../base/application.exception';

export class ForbiddenException extends ApplicationException {
  constructor(message = 'Forbidden') {
    super(message);
  }
}
