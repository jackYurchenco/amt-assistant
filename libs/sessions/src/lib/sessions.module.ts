import { Module } from '@nestjs/common';
import { SessionsController } from './interface/sessions.controller';
import { PrismaModule } from '@amt-assistant/prisma';
import { GetSessionsByUserIdUseCase } from './application/get-sessions-by-user-id/get-sessions-by-user-id.use-case';
import { RemoveAllSessionsByUserIdUseCase } from './application/remove-all-sessions-by-user-id/remove-all-sessions-by-user-id.use-case';
import { RemoveSessionByIdUseCase } from './application/remove-session-by-id/remove-session-by-id.use-case';
import { SessionReader } from './domain/ports/session-reader.port';
import { SessionRemover } from './domain/ports/session-remover.port';
import { PrismaSessionRepository } from './infrastructure/prisma-session.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SessionsController],
  providers: [
    GetSessionsByUserIdUseCase,
    RemoveAllSessionsByUserIdUseCase,
    RemoveSessionByIdUseCase,
    {
      provide: SessionReader,
      useClass: PrismaSessionRepository,
    },
    {
      provide: SessionRemover,
      useClass: PrismaSessionRepository,
    },
  ],
})
export class SessionsModule {}
