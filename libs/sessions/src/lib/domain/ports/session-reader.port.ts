import { SessionId, UserId } from '@amt-assistant/domain';
import { SessionEntity } from '../session.entity';

export abstract class LetterReader {
  abstract findById(id: SessionId): Promise<SessionEntity | null>;
  abstract findByUserId(id: UserId): Promise<SessionEntity | null>;
}
