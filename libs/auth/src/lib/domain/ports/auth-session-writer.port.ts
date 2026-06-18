import { AuthSession } from '../auth-session.entity';

export abstract class AuthSessionWriter {
  abstract create(session: AuthSession): Promise<void>;
}
