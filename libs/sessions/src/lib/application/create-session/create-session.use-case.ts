import { Injectable } from '@nestjs/common';
import { Session } from '../../domain/session.entity';
import { CreateSessionCommand } from './create-session.command';
import { SessionWriter } from '../../domain/ports/session-writer.port';

@Injectable()
export class CreateSessionUseCase {
  constructor(private readonly sessionWriter: SessionWriter) {}

  async execute(command: CreateSessionCommand): Promise<Session> {
    const session = Session.create({
      userId: command.userId,
      refreshToken: command.refreshToken,
      expiresAt: command.expiresAt,
      userAgent: command.userAgent ?? null,
    });

    await this.sessionWriter.create(session);

    return session;
  }
}