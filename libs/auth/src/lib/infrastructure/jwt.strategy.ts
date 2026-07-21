import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayloadInterface } from '@amt-assistant/util-token';
import { GetUserByEmailUseCase } from '@amt-assistant/users';
import { AuthenticationException } from '@amt-assistant/exceptions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    public readonly configService: ConfigService,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'MY_SUPER_SECRET_KEY',
    });
  }

  async validate(payload: IJwtPayloadInterface): Promise<{ userId: string, email: string }> {
    const user = await this.getUserByEmailUseCase.execute({ email: payload.email });

    if (!user) {
      throw new AuthenticationException();
    }

    return { userId: payload.userId, email: payload.email };
  }
}
