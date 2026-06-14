import { Injectable } from '@nestjs/common';
import { RemoveSessionsByUserIdCommand } from './remove-sessions-by-user-id.command';
import { SessionRemover } from '../../domain/ports/session-remover.port';
import { UserId } from '@amt-assistant/domain';

@Injectable()
export class RemoveSessionsByUserIdUseCase {
  constructor(private readonly sessionRemover: SessionRemover) {}

  async execute(command: RemoveSessionsByUserIdCommand): Promise<void> {
    await this.sessionRemover.removeByUserId(UserId.create(command.userId));
  }
}
