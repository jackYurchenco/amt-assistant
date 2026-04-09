import { Injectable } from "@nestjs/common";
import { PrismaService } from "@amt-assistant/prisma";
import { IUserRepository } from "../domain/user.repository.interface";
import { User } from "../domain/user.entity";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prismaService.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        passwordHash: user.passwordHash,
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
        updatedAt: user.updatedAt,
      },
      create: {
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const raw = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!raw) return null;

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

  async findByEmail(email:string): Promise<User | null> {
    const raw = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!raw) return null;

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
        })
    );
  }
}
