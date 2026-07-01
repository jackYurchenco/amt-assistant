import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthTokens, TokenService } from '@amt-assistant/util-token';
import { RefreshTokenCommand } from './refresh-token.command';
import { FindSessionByTokenUseCase, RemoveSessionByIdUseCase, CreateSessionUseCase } from '@amt-assistant/sessions';
import { GetUserByEmailUseCase } from '@amt-assistant/users';
import { ILoginResponse } from '@amt-assistant/contracts';
import { ITokenPayload } from '@amt-assistant/util-token';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly tokenService: TokenService,
    private readonly findSessionByTokenUseCase: FindSessionByTokenUseCase,
    private readonly removeSessionByIdUseCase: RemoveSessionByIdUseCase,
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<ILoginResponse> {
    try {
      const payload = await this.tokenService.verifyToken<ITokenPayload>(command.refreshToken);

      const session = await this.findSessionByTokenUseCase.execute({ token: command.refreshToken });
      if (!session) {
        throw new UnauthorizedException('Session not found');
      }

      const user = await this.getUserByEmailUseCase.execute({ email: payload.email });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokens: IAuthTokens = await this.tokenService.generateTokens({
        userId: user.id.getValue(),
        email: user.email.getValue(),
      });

      await this.removeSessionByIdUseCase.execute({ sessionId: session.id, userId: session.userId });

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
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
