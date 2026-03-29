import { Inject, Injectable } from "@nestjs/common";
import { ILetterRepository } from "../../domain/letter.repository.interface";
import { v4 as uuidv4 } from "uuid";
import { CreateLetterDto } from "./dto/create-letter.dto";
import { Letter, LetterStatus } from "../../domain/letter.entity";


@Injectable()
export class CreateLetterUseCase {
  constructor(
    @Inject('ILetterRepository')
    private readonly letterRepository: ILetterRepository
  ) {}

  async execute(createLetterDto: CreateLetterDto): Promise<Letter> {
    const letter = new Letter(
      uuidv4(),
      createLetterDto.title,
      LetterStatus.PENDING,
      new Date(),
      createLetterDto.sender || null,
      null
    )
    await this.letterRepository.save(letter);

    return letter;
  }
}
