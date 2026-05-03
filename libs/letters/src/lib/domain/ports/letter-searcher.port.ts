import { Letter } from '../letter.entity';

export abstract class LetterSearcher {
  abstract findAll(): Promise<Letter[]>;
}
