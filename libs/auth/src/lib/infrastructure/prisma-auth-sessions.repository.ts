import { Injectable } from '@nestjs/common';
import { PrismaService } from '@amt-assistant/prisma';
import { AuthSessionWriter } from '../domain/ports/auth-session-writer.port';
import { AuthSession } from '../domain/auth-session.entity';
import { DatabaseOperationException } from '@amt-assistant/exceptions';

@Injectable()
export class PrismaAuthSessionsRepository implements AuthSessionWriter {
  constructor(private readonly prismaService: PrismaService) {}

  async create(session: AuthSession): Promise<void> {
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
