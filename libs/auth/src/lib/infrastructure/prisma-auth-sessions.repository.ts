import { Injectable } from '@nestjs/common';
import { PrismaService } from '@amt-assistant/prisma';
import { AuthSessionWriter } from '../domain/ports/auth-session-writer.port';
import { AuthSession } from '../domain/auth-session.entity';

@Injectable()
export class PrismaAuthSessionsRepository implements AuthSessionWriter {
  constructor(private readonly prismaService: PrismaService) {}

  async create(session: AuthSession): Promise<void> {
    await this.prismaService.session.create({
      data: {
        id: session.id.getValue(),
        userId: session.userId.getValue(),
        refreshToken: session.refreshToken.getValue(),
        expiresAt: session.expiresAt,
        userAgent: session.userAgent ?? null,
      },
    });
  }
}
