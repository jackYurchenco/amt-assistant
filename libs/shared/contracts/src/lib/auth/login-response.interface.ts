import { IUser } from '../user/user.interface';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: Pick<IUser, 'id' | 'email'>;
}
