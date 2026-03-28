import { Module } from '@nestjs/common';
import { PrismaModule } from "@amt-assistant/prisma";
import { LettersController } from "./letters/letters.controller";
import { LettersModule } from "@amt-assistant/letters";

@Module({
  imports: [
    PrismaModule,
    LettersModule
  ],
  controllers: [LettersController],
  providers: [],
})
export class AppModule {}
