import { Module } from '@nestjs/common';
import { PrismaModule } from '@amt-assistant/prisma';
import { LettersModule } from '@amt-assistant/letters';
import { UsersModule } from '@amt-assistant/users';
import { AuthModule, JwtAuthGuard } from '@amt-assistant/auth';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    LettersModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
