import { Module } from '@nestjs/common';
import { PrismaModule } from '@amt-assistant/prisma';
import { CreateLetterUseCase } from './application/create-letter/create-letter.use-case';
import { PrismaLetterRepository } from './infrastructure/prisma-letter.repository';
import { LettersController } from './interface/letters.controller';
import { GetLetterByIdUseCase } from './application/get-letter-by-id/get-letter-by-id.use-case';
import { GetLettersByUserIdUseCase } from './application/get-letters-by-user-id/get-letters-by-user-id.use-case';
import { LetterWriter } from './domain/ports/letter-writer.port';
import { LetterReader } from './domain/ports/letter-reader.port';

@Module({
  imports: [PrismaModule],
  controllers: [LettersController],
  providers: [
    CreateLetterUseCase,
    GetLetterByIdUseCase,
    GetLettersByUserIdUseCase,
    { provide: LetterWriter, useClass: PrismaLetterRepository },
    { provide: LetterReader, useClass: PrismaLetterRepository },
  ],
})
export class LettersModule {}
