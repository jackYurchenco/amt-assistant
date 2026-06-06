import { Injectable } from '@nestjs/common';
import { GetSessionByUserIdQuery } from './get-session-by-user-id.query';
import { Session } from '../../domain/session.entity';
import { UserId } from '@amt-assistant/domain';
import { SessionReader } from '../../domain/ports/session-reader.port';

@Injectable()
export class GetSessionByUserIdUseCase {
  constructor(private readonly sessionReader: SessionReader) {}

  async execute(query: GetSessionByUserIdQuery): Promise<Session[]> {
    return this.sessionReader.findByUserId(UserId.create(query.userId));
  }
}
