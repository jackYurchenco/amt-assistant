import { GetUserByEmailUseCase } from '@amt-assistant/users';
import { LoginCommand } from './login.command';
import { UnauthorizedException } from '@nestjs/common';

export class LoginUseCase {
  constructor(private readonly getUserByEmailUseCase: GetUserByEmailUseCase) {
  }


  async execute(command: LoginCommand) {
    const user = await this.getUserByEmailUseCase.execute({ email: command.email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // TODO: Inject HasherService from @amt-assistant/shared/util-crypto
    // TODO: Verify password: await this.hasherService.compare(command.password, user.passwordHash)
    // TODO: Generate tokens via TokenService

  }
}
