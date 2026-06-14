import { Injectable } from '@nestjs/common';
import { SessionRemover } from '../domain/ports/session-remover.port';
import { SessionReader } from '../domain/ports/session-reader.port';
import { Session } from '../domain/session.entity';
import { SessionId, UserId } from '@amt-assistant/domain';
import { Session as PrismaSession } from '@prisma/client';
import { SessionMapper } from './mappers/session.mapper';
import { PrismaService } from '@amt-assistant/prisma';

@Injectable()
export class PrismaSessionRepository implements SessionReader, SessionRemover {
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
}
