import { Injectable } from '@nestjs/common';
import { RemoveSessionByIdCommand } from './remove-session-by-id.command';
import { SessionRemover } from '../../domain/ports/session-remover.port';
import { SessionId } from '@amt-assistant/domain';

@Injectable()
export class RemoveSessionByIdUseCase {
  constructor(private readonly sessionRemover: SessionRemover) {}

  async execute(command: RemoveSessionByIdCommand): Promise<void> {
    await this.sessionRemover.remove(SessionId.create(command.sessionId));
  }
}
