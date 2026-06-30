import { AuthUserReader } from '../domain/ports/auth-user-reader.port';
import { LoginCommand } from './login.command';
import { Inject, Injectable } from '@nestjs/common';
import { HasherService } from '@amt-assistant/util-crypto';
import { IAuthTokens, TokenService } from '@amt-assistant/util-token';
import { ILoginResponse } from '@amt-assistant/contracts';
import { CreateSessionUseCase } from '@amt-assistant/sessions';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { AuthUser } from '../domain/auth-user.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(AuthUserReader) private readonly authUserReader: AuthUserReader,
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly hasherService: HasherService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: LoginCommand): Promise<ILoginResponse> {
    const user = await this.findUser(command.email.getValue());

    await this.validatePassword(
      command.password.getValue(),
      user.passwordHash.getValue(),
    );

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

  private async findUser(email: string): Promise<AuthUser> {
    const user = await this.authUserReader.getUserByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    return user;
  }

  private async validatePassword(password: string, hash: string): Promise<void> {
    const isPasswordValid = await this.hasherService.compare(password, hash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }
  }

}
