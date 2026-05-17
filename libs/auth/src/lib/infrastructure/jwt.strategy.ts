import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ITokenPayload } from '@amt-assistant/util-token';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'MY_SUPER_SECRET_KEY',
    });
  }

  async validate(payload: ITokenPayload): Promise<{ userId: string, email: string }> {
    return { userId: payload.userId, email: payload.email };
  }
}
