import { Module } from '@nestjs/common';
import { PrismaModule } from "@amt-assistant/prisma";
import { CreateLetterUseCase } from "./application/create-letter/create-letter.use-case";
import { PrismaLetterRepository } from "./infrastructure/prisma-letter.repository";
import { LettersController } from "./interface/letters.controller";


@Module({
  imports: [PrismaModule],
  controllers: [LettersController],
  providers: [
    CreateLetterUseCase,
    {
      provide: 'ILetterRepository',
      useClass: PrismaLetterRepository,
    }
  ],
  exports: [CreateLetterUseCase],
})
export class LettersModule {}
