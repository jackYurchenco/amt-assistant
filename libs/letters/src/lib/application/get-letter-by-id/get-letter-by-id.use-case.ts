import { Injectable, NotFoundException } from '@nestjs/common';
import { GetLetterByIdQuery } from './get-letter-by-id.query';
import { Letter } from '../../domain/letter.entity';
import { LetterRepository } from '../../domain/letter.repository';
import { LetterId } from '@amt-assistant/domain';

@Injectable()
export class GetLetterByIdUseCase {
  constructor(private readonly letterRepository: LetterRepository) {}

  async execute(query: GetLetterByIdQuery): Promise<Letter> {
    const letter = await this.letterRepository.findById(LetterId.create(query.id));

    if (!letter) {
      throw new NotFoundException(`Letter with ID ${query.id} not found`);
    }

    return letter;
  }
}
