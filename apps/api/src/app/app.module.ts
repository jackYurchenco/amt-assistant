import { Module } from '@nestjs/common';
import { PrismaModule } from "@amt-assistant/prisma";
import { LettersModule } from "@amt-assistant/letters";
import { UsersModule } from "@amt-assistant/users";
import { AuthModule } from '@amt-assistant/auth';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    LettersModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
