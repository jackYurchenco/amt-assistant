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
    const raw: PrismaSession | null = await this.prismaService.session.findUnique({
      where: { id: id.getValue() },
    });

    return raw ? SessionMapper.toDomain(raw) : null;
  }

  async findByUserId(id: UserId): Promise<Session[]> {
    const raw: PrismaSession[] = await this.prismaService.session.findMany({
      where: { userId: id.getValue() },
    });

    return raw.map(SessionMapper.toDomain);
  }

  async findByToken(token: string): Promise<Session | null> {
    const raw: PrismaSession | null = await this.prismaService.session.findFirst({
      where: { refreshToken: token },
    });

    return raw ? SessionMapper.toDomain(raw) : null;
  }

  async remove(id: SessionId): Promise<void> {
    await this.prismaService.session.delete({
      where: { id: id.getValue() },
    });
  }

  async removeByUserId(id: UserId): Promise<void> {
    await this.prismaService.session.deleteMany({
      where: { userId: id.getValue() },
    });
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
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new DatabaseOperationException(errorMessage);
    }
  }
}
