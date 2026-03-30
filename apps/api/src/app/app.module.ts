import { Module } from '@nestjs/common';
import { PrismaModule } from "@amt-assistant/prisma";
import { LettersModule } from "@amt-assistant/letters";

@Module({
  imports: [
    PrismaModule,
    LettersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
