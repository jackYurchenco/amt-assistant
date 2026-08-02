import { Injectable } from '@nestjs/common';
import { SessionRemover } from '../domain/ports/session-remover.port';
import { SessionReader } from '../domain/ports/session-reader.port';
import { Session } from '../domain/session.entity';
import { SessionId, UserId } from '@amt-assistant/domain';
import { Session as PrismaSession } from '@prisma/client';
import { SessionMapper } from './mappers/session.mapper';
import { PrismaService } from '@amt-assistant/prisma';

import { SessionWriter } from '../domain/ports/session-writer.port';
import { DatabaseOperationException } from '@amt-assistant/exceptions';

@Injectable()
export class PrismaSessionRepository implements SessionReader, SessionRemover, SessionWriter {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: SessionId): Promise<Session | null> {
    try {
      const raw: PrismaSession | null = await this.prismaService.session.findUnique({
        where: { id: id.getValue() },
      });

      return raw ? SessionMapper.toDomain(raw) : null;
    } catch {
      throw new DatabaseOperationException('Failed to find session by ID in the database');
    }
  }

  async findByUserId(id: UserId): Promise<Session[]> {
    try {
      const raw: PrismaSession[] = await this.prismaService.session.findMany({
        where: { userId: id.getValue() },
      });

      return raw.map(SessionMapper.toDomain);
    } catch {
      throw new DatabaseOperationException('Failed to find sessions by user ID in the database');
    }
  }

  async findByToken(token: string): Promise<Session | null> {
    try {
      const raw: PrismaSession | null = await this.prismaService.session.findFirst({
        where: { refreshToken: token },
      });

      return raw ? SessionMapper.toDomain(raw) : null;
    } catch {
      throw new DatabaseOperationException('Failed to find session by token in the database');
    }
  }

  async remove(id: SessionId): Promise<void> {
    try {
      await this.prismaService.session.delete({
        where: { id: id.getValue() },
      });
    } catch {
      throw new DatabaseOperationException('Failed to remove session in the database');
    }
  }

  async removeByUserId(id: UserId): Promise<void> {
    try {
      await this.prismaService.session.deleteMany({
        where: { userId: id.getValue() },
      });
    } catch {
      throw new DatabaseOperationException('Failed to remove sessions by user ID in the database');
    }
  }

  async create(session: Session): Promise<void> {
    try {
      await this.prismaService.session.create({
        data: {
          id: session.id.getValue(),
          userId: session.userId.getValue(),
          refreshToken: session.refreshToken.getValue(),
          expiresAt: session.expiresAt,
          userAgent: session.userAgent ?? null,
        },
      });
    } catch {
      throw new DatabaseOperationException('Failed to create session in the database');
    }
  }
}
