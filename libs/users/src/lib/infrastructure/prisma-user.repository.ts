import { Injectable } from '@nestjs/common';
import { PrismaService } from '@amt-assistant/prisma';
import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';
import { Email, UserId } from '@amt-assistant/domain';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prismaService.user.upsert({
      where: { id: user.id.getValue() },
      update: {
        email: user.email.getValue(),
        passwordHash: user.passwordHash.getValue(),
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
        updatedAt: user.updatedAt,
      },
      create: {
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

  async findById(id: UserId): Promise<User | null> {
    const raw = await this.prismaService.user.findUnique({
      where: { id: id.getValue() },
    });

    if (!raw) {return null;}

    return User.restore({
      id: raw.id,
      email: raw.email,
      passwordHash: raw.passwordHash,
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

    if (!raw) {return null;}

    return User.restore({
      id: raw.id,
      email: raw.email,
      passwordHash: raw.passwordHash,
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
          id: raw.id,
          email: raw.email,
          passwordHash: raw.passwordHash,
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
          firstName: raw.firstName,
          lastName: raw.lastName,
        }),
    );
  }
}
