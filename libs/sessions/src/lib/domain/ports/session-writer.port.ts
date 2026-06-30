import { Session } from '../session.entity';

export abstract class SessionWriter {
  abstract create(session: Session): Promise<void>;
}
