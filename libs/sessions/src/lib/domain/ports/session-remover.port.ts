import { SessionId, UserId } from '@amt-assistant/domain';

export abstract class SessionRemover {
  abstract remove(id: SessionId): Promise<void>;
  abstract removeAllByUserId(id: UserId): Promise<void>;
}
