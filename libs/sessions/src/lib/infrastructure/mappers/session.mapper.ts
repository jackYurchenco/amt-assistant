import { Session as PrismaSession } from '@prisma/client';
import { SessionEntity } from '../../domain/session.entity';

export class SessionMapper {
  static toDomain(raw: PrismaSession): SessionEntity {
    return SessionEntity.restore({
      id: raw.id,
      userId: raw.userId,
      refreshToken: raw.refreshToken,
      expiresAt: raw.expiresAt,
      userAgent: raw.userAgent,
    });
  }

  static toPersistence(session: SessionEntity): PrismaSession {
    return {
      id: session.id.getValue(),
      userId: session.userId.getValue(),
      refreshToken: session.refreshToken.getValue(),
      expiresAt: session.expiresAt,
      userAgent: session.userAgent,
    };
  }
}
