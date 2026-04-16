import { GetUserByEmailUseCase } from '@amt-assistant/users';
import { LoginCommand } from './login.command';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { HasherService } from '@amt-assistant/util-crypto';
import { IAuthTokens, TokenService } from '@amt-assistant/util-token';
import { ILoginResponse } from '@amt-assistant/contracts';

export class LoginUseCase {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly hasherService: HasherService,
    private readonly tokenService: TokenService
  ) {}

  async execute(command: LoginCommand): Promise<ILoginResponse> {
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

    const tokens: IAuthTokens = await this.tokenService.generateTokens({
      userId: user.id,
      email: user.email
    })

    if (!tokens) {
      throw new InternalServerErrorException('Failed to generate authentication tokens');
    }

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email
      }
    };
  }
}
