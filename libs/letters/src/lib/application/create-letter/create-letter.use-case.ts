import { Injectable } from '@nestjs/common';
import { Letter } from '../../domain/letter.entity';
import { CreateLetterCommand } from './create-letter.command';
import { LetterRepository } from '../../domain/letter.repository';

@Injectable()
export class CreateLetterUseCase {
  constructor(private readonly letterRepository: LetterRepository) {}

  async execute(command: CreateLetterCommand) {

    const letter = Letter.create({
      userId: command.userId,
      title: command.title,
      sender: command.sender ?? null,
    });

    await this.letterRepository.save(letter);

    return letter;
  }
}
