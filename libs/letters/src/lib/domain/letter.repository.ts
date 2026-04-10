import { Letter } from "./letter.entity";

export abstract class LetterRepository {
  abstract save(letter: Letter): Promise<void>;
  abstract findById(id: string): Promise<Letter | null>;
  abstract findByUserId(userId: string): Promise<Letter[]>;
}
