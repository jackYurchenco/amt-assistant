import { Injectable } from '@nestjs/common';
import { PrismaService } from '@amt-assistant/prisma';
import { User } from '../domain/user.entity';
import { User as PrismaUser } from '@prisma/client';
import { Email, UserId } from '@amt-assistant/domain';
import { UserWriter } from '../domain/ports/user-writer.port';
import { UserReader } from '../domain/ports/user-reader.port';
import { UserSearcher } from '../domain/ports/user-searcher.port';
import { UserChecker } from '../domain/ports/user-checker.port';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class PrismaUserRepository implements UserReader, UserWriter, UserSearcher, UserChecker {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const data: PrismaUser = UserMapper.toPersistence(user);

    await this.prismaService.user.create({ data });
  }

  async update(user: User): Promise<void> {
    const data: PrismaUser = UserMapper.toPersistence(user);

    await this.prismaService.user.update({
      where: { id: user.id.getValue() },
      data,
    });
  }

  async findById(id: UserId): Promise<User | null> {
    const raw: PrismaUser | null = await this.prismaService.user.findUnique({
      where: { id: id.getValue() },
    });

    return raw ? UserMapper.toDomain(raw) : null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const raw: PrismaUser | null = await this.prismaService.user.findUnique({
      where: { email: email.getValue() },
    });

    return raw ? UserMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<Array<User>> {
    const records: Array<PrismaUser> = await this.prismaService.user.findMany();

    return records.map((raw: PrismaUser) => UserMapper.toDomain(raw));
  }

  async existsByEmail(email: Email): Promise<boolean> {
    const count: number = await this.prismaService.user.count({
      where: { email: email.getValue() },
    });
    return Boolean(count);
  }
}
