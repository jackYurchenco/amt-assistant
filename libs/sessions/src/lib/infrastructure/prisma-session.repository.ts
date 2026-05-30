import { Injectable } from '@nestjs/common';
import { SessionWriter } from '../domain/ports/session-writer.port';
import { SessionRemover } from '../domain/ports/session-remover.port';
import { SessionReader } from '../domain/ports/session-reader.port';
import { Session } from '../domain/session.entity';
import { SessionId, UserId } from '@amt-assistant/domain';

@Injectable()
export class PrismaSessionRepository implements SessionWriter, SessionReader, SessionRemover {
  constructor() {}

  async create(session: Session): Promise<void> {
    // TODO create session
  }

  async findById(id: SessionId): Promise<Session | null> {
    // TODO find session by id
    return null;
  }

  async findByUserId(id: UserId): Promise<Session | null> {
    // TODO find session by userId
    return null;
  }

  async remove(id: SessionId): Promise<void> {
    // TODO remove session
  }
}
