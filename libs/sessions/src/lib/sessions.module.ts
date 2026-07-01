import { Module } from '@nestjs/common';
import { SessionsController } from './interface/sessions.controller';
import { PrismaModule } from '@amt-assistant/prisma';
import { GetSessionsByUserIdUseCase } from './application/get-sessions-by-user-id/get-sessions-by-user-id.use-case';
import { RemoveSessionsByUserIdUseCase } from './application/remove-sessions-by-user-id/remove-sessions-by-user-id.use-case';
import { RemoveSessionByIdUseCase } from './application/remove-session-by-id/remove-session-by-id.use-case';
import { SessionReader } from './domain/ports/session-reader.port';
import { SessionRemover } from './domain/ports/session-remover.port';
import { PrismaSessionRepository } from './infrastructure/prisma-session.repository';
import { CreateSessionUseCase } from './application/create-session/create-session.use-case';
import { SessionWriter } from './domain/ports/session-writer.port';
import { FindSessionByTokenUseCase } from './application/find-session-by-token/find-session-by-token.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [SessionsController],
  providers: [
    GetSessionsByUserIdUseCase,
    RemoveSessionsByUserIdUseCase,
    RemoveSessionByIdUseCase,
    {
      provide: SessionReader,
      useClass: PrismaSessionRepository,
    },
    {
      provide: SessionRemover,
      useClass: PrismaSessionRepository,
    },
    {
      provide: SessionWriter,
      useClass: PrismaSessionRepository,
    },
    CreateSessionUseCase,
    FindSessionByTokenUseCase,
  ],
  exports: [
    CreateSessionUseCase,
    FindSessionByTokenUseCase,
    RemoveSessionByIdUseCase,
  ],
})
export class SessionsModule {}
