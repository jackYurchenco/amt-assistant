import { Injectable } from '@nestjs/common';
import { PrismaService } from '@amt-assistant/prisma';
import { Letter } from '../domain/letter.entity';
import { LetterId, UserId } from '@amt-assistant/domain';
import { LetterWriter } from '../domain/ports/letter-writer.port';
import { LetterReader } from '../domain/ports/letter-reader.port';
import { LetterMapper } from './mappers/letter.mapper';
import { Letter as PrismaLetter } from '@prisma/client';
import { DatabaseOperationException } from '@amt-assistant/exceptions';

@Injectable()
export class PrismaLetterRepository implements LetterWriter, LetterReader {
  constructor(private readonly prismaService: PrismaService) {}

  async create(letter: Letter): Promise<void> {
    const data: PrismaLetter = LetterMapper.toPersistence(letter);

    try {
      await this.prismaService.letter.create({ data });
    } catch {
      throw new DatabaseOperationException('Failed to create letter in the database');
    }
  }

  async update(letter: Letter): Promise<void> {
    const data: PrismaLetter = LetterMapper.toPersistence(letter);

    try {
      await this.prismaService.letter.update({
        where: { id: letter.id.getValue() },
        data,
      });
    } catch {
      throw new DatabaseOperationException('Failed to update letter in the database');
    }
  }

  async findById(id: LetterId): Promise<Letter | null> {
    try {
      const raw: PrismaLetter | null = await this.prismaService.letter.findUnique({
        where: { id: id.getValue() },
      });

      return raw ? LetterMapper.toDomain(raw) : null;
    } catch {
      throw new DatabaseOperationException('Failed to find letter by ID in the database');
    }
  }

  async findByUserId(userId: UserId): Promise<Letter[]> {
    try {
      const records: Array<PrismaLetter> = await this.prismaService.letter.findMany({
        where: { userId: userId.getValue() },
        orderBy: { createdAt: 'desc' },
      });
      return records.map((raw) => LetterMapper.toDomain(raw));
    } catch {
      throw new DatabaseOperationException('Failed to find letters by user ID in the database');
    }
  }
}
