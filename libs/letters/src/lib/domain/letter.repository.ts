import { Letter } from './letter.entity';
import { LetterId, UserId } from '@amt-assistant/domain';

export abstract class LetterRepository {
  abstract save(letter: Letter): Promise<void>;
  abstract findById(id: LetterId): Promise<Letter | null>;
  abstract findByUserId(userId: UserId): Promise<Letter[]>;
}
