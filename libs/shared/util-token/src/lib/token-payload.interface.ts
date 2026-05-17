import { IJwtPayloadInterface } from './jwt-payload.interface';

export interface ITokenPayload extends IJwtPayloadInterface {
  userId: string;
  email: string;
}
