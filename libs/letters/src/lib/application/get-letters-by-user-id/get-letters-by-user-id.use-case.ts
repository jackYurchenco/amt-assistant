import { Injectable } from '@nestjs/common';
import { Letter } from '../../domain/letter.entity';
import { GetLettersByUserIdQuery } from './get-letters-by-user-id.query';
import { UserId } from '@amt-assistant/domain';
import { LetterReader } from '../../domain/ports/letter-reader.port';

@Injectable()
export class GetLettersByUserIdUseCase {
  constructor(private readonly letterReader: LetterReader) {}

  async execute(query: GetLettersByUserIdQuery): Promise<Letter[]> {
    return this.letterReader.findByUserId(UserId.create(query.userId));
  }
}
