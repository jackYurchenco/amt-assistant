import { SessionId, UserId } from '@amt-assistant/domain';

export abstract class SessionRemover {
  abstract remove(id: SessionId): Promise<void>;
  abstract removeByUserId(id: UserId): Promise<void>;
}
