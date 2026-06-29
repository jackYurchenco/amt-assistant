import { AuthUserReader } from '../domain/ports/auth-user-reader.port';
import { LoginCommand } from './login.command';
import { Inject, Injectable } from '@nestjs/common';
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
    @Inject(AuthUserReader) private readonly authUserReader: AuthUserReader,
    @Inject(AuthSessionWriter) private readonly authSessionWriter: AuthSessionWriter,
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

    await this.createSession({
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

  private async createSession({
    userId,
    refreshToken,
    userAgent,
  }: {
    userId: string;
    refreshToken: string;
    userAgent?: string | undefined;
  }): Promise<void> {
    const session = AuthSession.create({
      id: SessionId.generate().getValue(),
      userId,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      ...(userAgent ? { userAgent } : {}),
    });

    await this.authSessionWriter.create(session);
  }
}
