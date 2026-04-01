import { Inject, Injectable } from "@nestjs/common";
import { ILetterRepository } from "../../domain/letter.repository.interface";
import { Letter } from "../../domain/letter.entity";
import { GetLettersByUserIdQuery } from "./get-letters-by-user-id.query";

@Injectable()
export class GetLettersByUserIdUseCase {
  constructor(
    @Inject(ILetterRepository)
    private readonly letterRepository: ILetterRepository
  ) {}

  async execute(query: GetLettersByUserIdQuery): Promise<Array<Letter>> {
    return this.letterRepository.findByUserId(query.userId);
  }
}
