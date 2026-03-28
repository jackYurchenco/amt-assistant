import { Inject, Injectable } from "@nestjs/common";
import { ILetterRepository } from "../../domain/letter.repository.interface";
import { CreateLetterDto, Letter, LetterStatus } from "@amt-assistant/letters";
import { v4 as uuidv4 } from "uuid";


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
