import { Inject, Injectable } from "@nestjs/common";
import { ILetterRepository } from "../../domain/letter.repository.interface";
import { v4 as uuidv4 } from "uuid";
import { Letter, LetterStatus } from "../../domain/letter.entity";
import { CreateLetterCommand } from "./create-letter.comman";


@Injectable()
export class CreateLetterUseCase {
  constructor(
    @Inject('ILetterRepository')
    private readonly letterRepository: ILetterRepository
  ) {}

  async execute(command: CreateLetterCommand): Promise<Letter> {
    const letter = new Letter(
      uuidv4(),
      command.title,
      LetterStatus.PENDING,
      new Date(),
      command.sender || null,
      null
    )
    await this.letterRepository.save(letter);

    return letter;
  }
}
