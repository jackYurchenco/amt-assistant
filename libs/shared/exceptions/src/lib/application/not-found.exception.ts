import { ApplicationException } from '../base/application.exception';

export class NotFoundException extends ApplicationException {
  constructor(message: string) {
    super(message);
  }
}
