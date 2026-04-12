import { ITokenPayload } from './token-payload.interface';
import { IAuthTokens } from './auth-tokens.interface';

export abstract class TokenService {
  abstract generateTokens(payload: ITokenPayload): Promise<IAuthTokens>;
  abstract verifyToken<T extends object>(token: string): Promise<T>;
}
