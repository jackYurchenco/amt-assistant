import { Injectable } from '@nestjs/common';
import { RemoveSessionByIdCommand } from './remove-session-by-id.command';
import { SessionRemover } from '../../domain/ports/session-remover.port';
import { SessionReader } from '../../domain/ports/session-reader.port';
import { SessionId } from '@amt-assistant/domain';
import { SessionNotFoundException } from '../exceptions/session-not-found.exception';
import { SessionForbiddenException } from '../exceptions/session-forbidden.exception';

@Injectable()
export class RemoveSessionByIdUseCase {
  constructor(
    private readonly sessionRemover: SessionRemover,
    private readonly sessionReader: SessionReader,
  ) {}

  async execute(command: RemoveSessionByIdCommand): Promise<void> {
    const sessionId = SessionId.create(command.sessionId);
    const session = await this.sessionReader.findById(sessionId);

    if (!session) {
      throw new SessionNotFoundException(`Session with ID ${command.sessionId} not found`);
    }

    if (session.userId.getValue() !== command.userId) {
      throw new SessionForbiddenException('You are not allowed to delete this session');
    }

    await this.sessionRemover.remove(sessionId);
  }
}
