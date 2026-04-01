import { Module } from '@nestjs/common';
import { PrismaModule } from "@amt-assistant/prisma";
import { CreateLetterUseCase } from "./application/create-letter/create-letter.use-case";
import { PrismaLetterRepository } from "./infrastructure/prisma-letter.repository";
import { LettersController } from "./interface/letters.controller";
import { ILetterRepository } from "./domain/letter.repository.interface";
import { GetLetterUseCase } from "./application/get-letter/get-letter.use-case";
import { GetLettersByUserIdUseCase } from "./application/get-letters-by-user-id/get-letters-by-user-id.use-case";


@Module({
  imports: [PrismaModule],
  controllers: [LettersController],
  providers: [
    CreateLetterUseCase,
    GetLetterUseCase,
    GetLettersByUserIdUseCase,
    {
      provide: ILetterRepository,
      useClass: PrismaLetterRepository,
    }
  ]
})
export class LettersModule {}
