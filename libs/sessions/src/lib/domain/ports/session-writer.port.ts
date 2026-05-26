import { SessionEntity } from '../session.entity';

export abstract class SessionWriter {
  abstract create(session: SessionEntity): Promise<void>;
}
