import { GetUserByEmailUseCase } from '@amt-assistant/users';
import { LoginCommand } from './login.command';
import { UnauthorizedException } from '@nestjs/common';
import { HasherService } from '@amt-assistant/util-crypto';

export class LoginUseCase {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly hasherService: HasherService
  ) {}

  async execute(command: LoginCommand) {
    const user = await this.getUserByEmailUseCase.execute({ email: command.email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hasherService.compare(
      command.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // TODO: Generate tokens via TokenService

  }
}
