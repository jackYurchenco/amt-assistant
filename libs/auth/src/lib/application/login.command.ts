import { Email } from '@amt-assistant/domain';

export class LoginCommand {
  constructor(
    public readonly email: Email,
    public readonly password: string,
  ) {}
}
