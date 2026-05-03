import { Letter } from '../letter.entity';

export abstract class LetterWriter {
  abstract create(letter: Letter): Promise<void>;

  abstract update(letter: Letter): Promise<void>;
}
