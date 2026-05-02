import { User as PrismaUser } from '@prisma/client';
import { Email, PasswordHash, UserId } from '@amt-assistant/domain';
import { User } from '../../domain/user.entity';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.restore({
      id: UserId.create(raw.id),
      email: Email.create(raw.email),
      passwordHash: PasswordHash.create(raw.passwordHash),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      firstName: raw.firstName ?? null,
      lastName: raw.lastName ?? null,
    });
  }

  static toPersistence(user: User): PrismaUser {
    return {
      id: user.id.getValue(),
      email: user.email.getValue(),
      passwordHash: user.passwordHash.getValue(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      firstName: user.firstName ?? null,
      lastName: user.lastName ?? null,
    };
  }
}
