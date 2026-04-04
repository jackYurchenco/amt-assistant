import { Inject, Injectable } from "@nestjs/common";
import { ILetterRepository } from "../../domain/letter.repository.interface";
import { GetLetterByIdQuery } from "./get-letter-by-id.query";
import { Letter } from "../../domain/letter.entity";

@Injectable()
export class GetLetterByIdUseCase {
  constructor(
    @Inject(ILetterRepository)
    private readonly letterRepository: ILetterRepository
  ) {}

  async execute(query: GetLetterByIdQuery): Promise<Letter | null> {
    return this.letterRepository.findById(query.id);
  }
}
