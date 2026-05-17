import { ITokenPayload } from '../interfaces/token-payload.interface';
import { IAuthTokens } from '../interfaces/auth-tokens.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TokenService {
  abstract generateTokens(payload: ITokenPayload): Promise<IAuthTokens>;
  abstract verifyToken<T extends object>(token: string): Promise<T>;
}
