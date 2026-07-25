import { LoginCommand } from './login.command';
import { Injectable } from '@nestjs/common';
import { HasherService } from '@amt-assistant/util-crypto';
import { IAuthTokens, TokenService } from '@amt-assistant/util-token';
import { ILoginResponse } from '@amt-assistant/contracts';
import { CreateSessionUseCase } from '@amt-assistant/sessions';
import { GetUserByEmailUseCase } from '@amt-assistant/users';
import { UnauthorizedException } from '@amt-assistant/exceptions';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly hasherService: HasherService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: LoginCommand): Promise<ILoginResponse> {
    const user = await this.getUserByEmailUseCase.execute({ email: command.email.getValue() });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.hasherService.compare(
      command.password.getValue(),
      user.passwordHash.getValue(),
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens: IAuthTokens = await this.tokenService.generateTokens({
      userId: user.id.getValue(),
      email: user.email.getValue(),
    });

    await this.createSessionUseCase.execute({
      userId: user.id.getValue(),
      refreshToken: tokens.refreshToken,
      userAgent: command.userAgent,
    });

    return {
      ...tokens,
      user: {
        id: user.id.getValue(),
        email: user.email.getValue(),
      },
    };
  }
}
