import { Email, RawPassword } from '@amt-assistant/domain';

export class CreateUserCommand {
  constructor(
    public readonly email: Email,
    public readonly password: RawPassword,
  ) {}
}
