import { Email } from '@amt-assistant/domain';

export class CreateUserCommand {
  constructor(
    public readonly email: Email,
    public readonly password: string,
  ) {}
}
