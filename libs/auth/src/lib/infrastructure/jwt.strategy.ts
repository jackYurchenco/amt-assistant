import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // TODO JWT_SECRET from .env
      secretOrKey: 'MY_SUPER_SECRET_KEY',
    });
  }

  async validate(payload: any): Promise<{ userId: string, email: string }> {
    return { userId: payload.sub, email: payload.email };
  }
}
