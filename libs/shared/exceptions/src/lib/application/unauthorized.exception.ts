import { ApplicationException } from '../base/application.exception';

export class UnauthorizedException extends ApplicationException {
  constructor(message = 'Unauthorized') {
    super(message);
  }
}
