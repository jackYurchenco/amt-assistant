import { SessionId, UserId } from '@amt-assistant/domain';
import { Session } from '../session.entity';

export abstract class SessionReader {
  abstract findById(id: SessionId): Promise<Session | null>;
  abstract findByUserId(id: UserId): Promise<Session | null>;
}
