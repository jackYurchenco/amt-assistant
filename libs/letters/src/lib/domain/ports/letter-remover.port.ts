import { LetterId } from '@amt-assistant/domain';

export abstract class LetterRemover {
  abstract remove(id: LetterId): Promise<void>
}
