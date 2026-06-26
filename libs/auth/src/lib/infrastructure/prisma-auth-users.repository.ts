import { Injectable } from '@nestjs/common';
import { PrismaService } from '@amt-assistant/prisma';
import { AuthUserReader } from '../domain/ports/auth-user-reader.port';
import { AuthUser } from '../domain/auth-user.entity';
import { DatabaseOperationException } from '@amt-assistant/exceptions';

@Injectable()
export class PrismaAuthUsersRepository implements AuthUserReader {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<AuthUser | null> {
    let raw;
    try {
      raw = await this.prismaService.user.findUnique({
        where: { email },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new DatabaseOperationException(errorMessage);
    }

    if (!raw) {
      return null;
    }

    return AuthUser.restore({
      id: raw.id,
      email: raw.email,
      passwordHash: raw.passwordHash,
    });
  }
}
