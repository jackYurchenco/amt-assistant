import { Injectable } from '@nestjs/common';
import { PrismaService } from '@amt-assistant/prisma';
import { User } from '../domain/user.entity';
import { Email, PasswordHash, UserId } from '@amt-assistant/domain';
import { UserWriter } from '../domain/ports/user-writer.port';
import { UserReader } from '../domain/ports/user-reader.port';
import { UserSearcher } from '../domain/ports/user-searcher.port';
import { UserChecker } from '../domain/ports/user-checker.port';

@Injectable()
export class PrismaUserRepository implements UserReader, UserWriter, UserSearcher, UserChecker {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        id: user.id.getValue(),
        email: user.email.getValue(),
        passwordHash: user.passwordHash.getValue(),
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }

  async update(user: User): Promise<void> {
    await this.prismaService.user.update({
      where: { id: user.id.getValue() },
      data: {
        email: user.email.getValue(),
        passwordHash: user.passwordHash.getValue(),
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
        updatedAt: user.updatedAt,
      },
    });
  }

  async findById(id: UserId): Promise<User | null> {
    const raw = await this.prismaService.user.findUnique({
      where: { id: id.getValue() },
    });

    if (!raw) {return null;}

    return User.restore({
      id: UserId.create(raw.id),
      email: Email.create(raw.email),
      passwordHash: PasswordHash.create(raw.passwordHash),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      firstName: raw.firstName,
      lastName: raw.lastName,
    });
  }

  async findByEmail(email: Email): Promise<User | null> {
    const raw = await this.prismaService.user.findUnique({
      where: { email: email.getValue() },
    });

    if (!raw) { return null; }

    return User.restore({
      id: UserId.create(raw.id),
      email: Email.create(raw.email),
      passwordHash: PasswordHash.create(raw.passwordHash),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      firstName: raw.firstName,
      lastName: raw.lastName,
    });
  }

  async findAll(): Promise<User[]> {
    const records = await this.prismaService.user.findMany();
    return records.map(
      (raw) =>
        User.restore({
          id: UserId.create(raw.id),
          email: Email.create(raw.email),
          passwordHash: PasswordHash.create(raw.passwordHash),
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
          firstName: raw.firstName,
          lastName: raw.lastName,
        }),
    );
  }

  async existsByEmail(email: Email): Promise<boolean> {
    const count: number = await this.prismaService.user.count({
      where: { email: email.getValue() },
    });
    return Boolean(count);
  }
}
