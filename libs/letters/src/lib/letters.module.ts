import { Module } from '@nestjs/common';
import { PrismaModule } from "@amt-assistant/prisma";
import { CreateLetterUseCase } from "./application/create-letter/create-letter.use-case";
import { PrismaLetterRepository } from "./infrastructure/prisma-letter.repository";


@Module({
  imports: [PrismaModule],
  controllers: [],
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
