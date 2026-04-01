import { Letter } from "./letter.entity";

export interface ILetterRepository {
  save(letter: Letter): Promise<void>;
  findById(id: string): Promise<Letter | null>;
  findByUserId(userId: string): Promise<Array<Letter>>;
}
