import { Injectable, NotFoundException } from '@nestjs/common';
import { GetLetterByIdQuery } from './get-letter-by-id.query';
import { Letter } from '../../domain/letter.entity';
import { LetterId } from '@amt-assistant/domain';
import { LetterReader } from '../../domain/ports/letter-reader.port';

@Injectable()
export class GetLetterByIdUseCase {
  constructor(private readonly letterReader: LetterReader) {}

  async execute(query: GetLetterByIdQuery): Promise<Letter> {
    const letter = await this.letterReader.findById(LetterId.create(query.id));

    if (!letter) {
      throw new NotFoundException(`Letter with ID ${query.id} not found`);
    }

    return letter;
  }
}
