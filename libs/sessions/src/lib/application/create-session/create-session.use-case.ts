import { Inject, Injectable } from '@nestjs/common';
import { SessionWriter } from '../../domain/ports/session-writer.port';
import { CreateSessionCommand } from './create-session.command';
import { Session } from '../../domain/session.entity';

@Injectable()
export class CreateSessionUseCase {
  constructor(
    @Inject(SessionWriter) private readonly sessionWriter: SessionWriter,
  ) {}

  async execute(command: CreateSessionCommand): Promise<void> {
    const session = Session.create({
      userId: command.userId,
      refreshToken: command.refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      userAgent: command.userAgent ?? null,
    });

    await this.sessionWriter.create(session);
  }
}
