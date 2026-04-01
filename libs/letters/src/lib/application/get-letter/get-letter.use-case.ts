import { Inject, Injectable } from "@nestjs/common";
import { ILetterRepository } from "../../domain/letter.repository.interface";
import { GetLetterQuery } from "./get-letter.query";
import { Letter } from "../../domain/letter.entity";

@Injectable()
export class GetLetterUseCase {
  constructor(
    @Inject('ILetterRepository')
    private readonly letterRepository: ILetterRepository
  ) {}

  async execute(query: GetLetterQuery): Promise<Letter | null> {
    return await this.letterRepository.findById(query.id);
  }
}
