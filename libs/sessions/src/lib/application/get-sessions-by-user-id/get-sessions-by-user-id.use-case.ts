import { Injectable } from '@nestjs/common';
import { GetSessionsByUserIdQuery } from './get-sessions-by-user-id.query';
import { Session } from '../../domain/session.entity';
import { UserId } from '@amt-assistant/domain';
import { SessionReader } from '../../domain/ports/session-reader.port';

@Injectable()
export class GetSessionsByUserIdUseCase {
  constructor(private readonly sessionReader: SessionReader) {}

  async execute(query: GetSessionsByUserIdQuery): Promise<Session[]> {
    return this.sessionReader.findByUserId(UserId.create(query.userId));
  }
}
