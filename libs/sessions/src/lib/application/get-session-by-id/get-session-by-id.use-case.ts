import { Injectable, NotFoundException } from '@nestjs/common';
import { GetSessionByIdQuery } from './get-session-by-id.query';
import { Session } from '../../domain/session.entity';
import { SessionId } from '@amt-assistant/domain';
import { SessionReader } from '../../domain/ports/session-reader.port';

@Injectable()
export class GetSessionByIdUseCase {
  constructor(private readonly sessionReader: SessionReader) {}

  async execute(query: GetSessionByIdQuery): Promise<Session> {
    const session = await this.sessionReader.findById(SessionId.create(query.id));

    if (!session) {
      throw new NotFoundException(`Session with ID ${query.id} not found`);
    }

    return session;
  }
}
