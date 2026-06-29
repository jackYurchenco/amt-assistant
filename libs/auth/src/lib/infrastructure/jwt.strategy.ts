import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayloadInterface } from '@amt-assistant/util-token';
import { AuthUserReader } from '../domain/ports/auth-user-reader.port';
import { InvalidTokenException } from '../application/exceptions/invalid-token.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    public readonly configService: ConfigService,
    @Inject(AuthUserReader) private readonly authUserReader: AuthUserReader,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'MY_SUPER_SECRET_KEY',
    });
  }

  async validate(payload: IJwtPayloadInterface): Promise<{ userId: string, email: string }> {
    const user = await this.authUserReader.getUserByEmail(payload.email);

    if (!user) {
      throw new InvalidTokenException();
    }

    return { userId: payload.userId, email: payload.email };
  }
}
