import { Module } from '@nestjs/common';
import { PrismaModule } from "@amt-assistant/prisma";
import { LettersModule } from "@amt-assistant/letters";
import { UsersModule } from "@amt-assistant/users";

@Module({
  imports: [
    PrismaModule,
    LettersModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
