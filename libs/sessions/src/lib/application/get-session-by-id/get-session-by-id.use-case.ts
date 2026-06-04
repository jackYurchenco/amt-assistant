import { Injectable } from '@nestjs/common';
import { GetSessionByIdQuery } from './get-session-by-id.query';
import { Session } from '../../domain/session.entity';
import { SessionId } from '@amt-assistant/domain';
import { SessionReader } from '../../domain/ports/session-reader.port';

@Injectable()
export class GetSessionByIdUseCase {
  constructor(private readonly sessionReader: SessionReader) {}

  async execute(query: GetSessionByIdQuery): Promise<Session | null> {
    return this.sessionReader.findById(SessionId.create(query.id));
  }
}
