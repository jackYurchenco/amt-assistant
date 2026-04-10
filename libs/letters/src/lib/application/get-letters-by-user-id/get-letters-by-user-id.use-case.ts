import { Injectable } from "@nestjs/common";
import { Letter } from "../../domain/letter.entity";
import { GetLettersByUserIdQuery } from "./get-letters-by-user-id.query";
import { LetterRepository } from '../../domain/letter.repository';

@Injectable()
export class GetLettersByUserIdUseCase {
  constructor(private readonly letterRepository: LetterRepository) {}

  async execute(query: GetLettersByUserIdQuery): Promise<Letter[]> {
    return this.letterRepository.findByUserId(query.userId);
  }
}
