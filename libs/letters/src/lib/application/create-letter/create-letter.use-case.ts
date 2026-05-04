import { Injectable } from '@nestjs/common';
import { Letter } from '../../domain/letter.entity';
import { CreateLetterCommand } from './create-letter.command';
import { LetterWriter } from '../../domain/ports/letter-writer.port';

@Injectable()
export class CreateLetterUseCase {
  constructor(private readonly letterWriter: LetterWriter) {}

  async execute(command: CreateLetterCommand): Promise<Letter> {

    const letter = Letter.create({
      userId: command.userId,
      title: command.title,
      sender: command.sender ?? null,
    });

    await this.letterWriter.create(letter);

    return letter;
  }
}
