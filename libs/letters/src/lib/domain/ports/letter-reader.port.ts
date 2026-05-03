import { LetterId, UserId } from '@amt-assistant/domain';
import { Letter } from '../letter.entity';

export abstract class LetterReader {
  abstract findById(id: LetterId): Promise<Letter | null>;
  abstract findByUserId(userId: UserId): Promise<Letter[]>;
}
