import { ITokenPayload } from './token-payload.interface';

export interface IJwtPayloadInterface extends ITokenPayload {
  iat: number;
  exp: number;
}
