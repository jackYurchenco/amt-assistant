import { Injectable } from '@nestjs/common';
import { RemoveSessionByIdCommand } from './remove-session-by-id.command';
import { SessionRemover } from '../../domain/ports/session-remover.port';
import { SessionReader } from '../../domain/ports/session-reader.port';
import { SessionId } from '@amt-assistant/domain';
import { ForbiddenException, NotFoundException } from '@amt-assistant/exceptions';

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
      throw new NotFoundException(`Session with ID ${command.sessionId} not found`);
    }

    if (session.userId.getValue() !== command.userId) {
      throw new ForbiddenException('You are not allowed to delete this session');
    }

    await this.sessionRemover.remove(sessionId);
  }
}
