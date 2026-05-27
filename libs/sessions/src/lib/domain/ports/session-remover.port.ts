import { SessionId } from '@amt-assistant/domain';

export abstract class SessionRemover {
  abstract remove(id: SessionId): Promise<void>
}
