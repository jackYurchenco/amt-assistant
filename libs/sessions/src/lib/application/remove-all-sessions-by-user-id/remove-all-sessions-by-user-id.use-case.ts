import { Injectable } from '@nestjs/common';
import { RemoveAllSessionsByUserIdCommand } from './remove-all-sessions-by-user-id.command';
import { SessionRemover } from '../../domain/ports/session-remover.port';
import { UserId } from '@amt-assistant/domain';

@Injectable()
export class RemoveAllSessionsByUserIdUseCase {
  constructor(private readonly sessionRemover: SessionRemover) {}

  async execute(command: RemoveAllSessionsByUserIdCommand): Promise<void> {
    await this.sessionRemover.removeAllByUserId(UserId.create(command.userId));
  }
}
