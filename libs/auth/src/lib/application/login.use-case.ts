import { AuthUserReader } from '../domain/ports/auth-user-reader.port';
import { LoginCommand } from './login.command';
import { Injectable } from '@nestjs/common';
import { HasherService } from '@amt-assistant/util-crypto';
import { IAuthTokens, TokenService } from '@amt-assistant/util-token';
import { ILoginResponse } from '@amt-assistant/contracts';
import { AuthSessionWriter } from '../domain/ports/auth-session-writer.port';
import { AuthSession } from '../domain/auth-session.entity';
import { SessionId } from '@amt-assistant/domain';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { AuthUser } from '../domain/auth-user.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly authUserReader: AuthUserReader,
    private readonly hasherService: HasherService,
    private readonly tokenService: TokenService,
    private readonly authSessionWriter: AuthSessionWriter,
  ) {}

  async execute(command: LoginCommand): Promise<ILoginResponse> {
    const user = await this.findUser(command.email.getValue());

    const isPasswordValid = await this.hasherService.compare(
      command.password.getValue(),
      user.passwordHash.getValue(),
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const tokens: IAuthTokens = await this.tokenService.generateTokens({
      userId: user.id.getValue(),
      email: user.email.getValue(),
    });

    const session = AuthSession.create({
      id: SessionId.generate().getValue(),
      userId: user.id.getValue(),
      refreshToken: tokens.refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      ...(command.userAgent ? { userAgent: command.userAgent } : {}),
    });

    await this.authSessionWriter.create(session);

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
}
