import { Injectable } from '@nestjs/common';
import { GetLetterByIdQuery } from './get-letter-by-id.query';
import { Letter } from '../../domain/letter.entity';
import { LetterId } from '@amt-assistant/domain';
import { LetterReader } from '../../domain/ports/letter-reader.port';
import { LetterNotFoundException } from '../exceptions/letter-not-found.exception';

@Injectable()
export class GetLetterByIdUseCase {
  constructor(private readonly letterReader: LetterReader) {}

  async execute(query: GetLetterByIdQuery): Promise<Letter> {
    const letter = await this.letterReader.findById(LetterId.create(query.id));

    if (!letter) {
      throw new LetterNotFoundException(`Letter with ID ${query.id} not found`);
    }

    return letter;
  }
}
