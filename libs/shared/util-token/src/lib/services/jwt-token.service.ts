
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { IAuthTokens } from '../interfaces/auth-tokens.interface';

import { TokenGenerationException } from '../exceptions/token-generation.exception';
import { TokenVerificationException } from '../exceptions/token-verification.exception';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(payload: ITokenPayload): Promise<IAuthTokens> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, { expiresIn: '15m' }),
        this.jwtService.signAsync(payload, { expiresIn: '7d' }),
      ]);

      return { accessToken, refreshToken };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new TokenGenerationException(errorMessage);
    }
  }

  async verifyToken<T extends object>(token: string): Promise<T> {
    try {
      return await this.jwtService.verifyAsync<T>(token);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new TokenVerificationException(errorMessage);
    }
  }
}
