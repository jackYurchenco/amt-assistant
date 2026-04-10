import { Module } from '@nestjs/common';
import { PrismaModule } from "@amt-assistant/prisma";
import { CreateLetterUseCase } from "./application/create-letter/create-letter.use-case";
import { PrismaLetterRepository } from "./infrastructure/prisma-letter.repository";
import { LettersController } from "./interface/letters.controller";
import { GetLetterByIdUseCase } from "./application/get-letter-by-id/get-letter-by-id.use-case";
import { GetLettersByUserIdUseCase } from "./application/get-letters-by-user-id/get-letters-by-user-id.use-case";
import { LetterRepository } from './domain/letter.repository';


@Module({
  imports: [PrismaModule],
  controllers: [LettersController],
  providers: [
    CreateLetterUseCase,
    GetLetterByIdUseCase,
    GetLettersByUserIdUseCase,
    {
      provide: LetterRepository,
      useClass: PrismaLetterRepository,
    }
  ]
})
export class LettersModule {}
