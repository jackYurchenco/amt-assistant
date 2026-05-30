import { Session as PrismaSession } from '@prisma/client';
import { Session } from '../../domain/session.entity';

export class SessionMapper {
  static toDomain(raw: PrismaSession): Session {
    return Session.restore({
      id: raw.id,
      userId: raw.userId,
      refreshToken: raw.refreshToken,
      expiresAt: raw.expiresAt,
      userAgent: raw.userAgent,
    });
  }

  static toPersistence(session: Session): PrismaSession {
    return {
      id: session.id.getValue(),
      userId: session.userId.getValue(),
      refreshToken: session.refreshToken.getValue(),
      expiresAt: session.expiresAt,
      userAgent: session.userAgent,
    };
  }
}
