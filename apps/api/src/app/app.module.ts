import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@amt-assistant/prisma';
import { LettersModule } from '@amt-assistant/letters';
import { UsersModule } from '@amt-assistant/users';
import { AuthModule, JwtAuthGuard } from '@amt-assistant/auth';
import { SessionsModule } from '@amt-assistant/sessions';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AppExceptionFilter } from './filters/app-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    LettersModule,
    UsersModule,
    SessionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
