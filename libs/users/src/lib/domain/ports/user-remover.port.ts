import { UserId } from '@amt-assistant/domain';

export abstract class UserRemover {
  abstract remove(id: UserId): Promise<void>
}
