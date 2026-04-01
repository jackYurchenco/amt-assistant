import { Inject, Injectable } from "@nestjs/common";
import { ILetterRepository } from "../../domain/letter.repository.interface";
import { Letter } from "../../domain/letter.entity";
import { CreateLetterCommand } from "./create-letter.command";


@Injectable()
export class CreateLetterUseCase {
  constructor(
    @Inject('ILetterRepository')
    private readonly letterRepository: ILetterRepository
  ) {}

  async execute(command: CreateLetterCommand): Promise<Letter> {

    const letter = Letter.create({
      userId: command.userId,
      title: command.title,
    });

    await this.letterRepository.save(letter);

    return letter;
  }
}
