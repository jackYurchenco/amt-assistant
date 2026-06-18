import { AuthUser } from '../auth-user.entity';

export abstract class AuthUserReader {
  abstract getUserByEmail(email: string): Promise<AuthUser | null>;
}
