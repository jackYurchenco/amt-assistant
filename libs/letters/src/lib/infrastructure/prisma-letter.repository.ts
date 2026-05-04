import { Injectable } from '@nestjs/common';
import { PrismaService } from '@amt-assistant/prisma';
import { Letter } from '../domain/letter.entity';
import { LetterStatus } from '@amt-assistant/contracts';
import { LetterId, UserId } from '@amt-assistant/domain';
import { LetterWriter } from '../domain/ports/letter-writer.port';
import { LetterReader } from '../domain/ports/letter-reader.port';

@Injectable()
export class PrismaLetterRepository implements LetterWriter, LetterReader {
  constructor(private readonly prismaService: PrismaService) {}

  async create(letter: Letter): Promise<void> {
    await this.prismaService.letter.create({
      data: {
        id: letter.id.getValue(),
        userId: letter.userId.getValue(),
        title: letter.title,
        status: letter.status,
        createdAt: letter.createdAt,
        updatedAt: letter.updatedAt,
        sender: letter.sender ?? null,
        analysisResult: letter.analysisResult ?? null,
        content: letter.content ?? null,
      },
    });
  }

  async update(letter: Letter): Promise<void> {
    await this.prismaService.letter.update({
      where: { id: letter.id.getValue() },
      data: {
        title: letter.title,
        status: letter.status,
        sender: letter.sender ?? null,
        analysisResult: letter.analysisResult ?? null,
        content: letter.content ?? null,
      },
    });
  }

  async findById(id: LetterId): Promise<Letter | null> {
    const raw = await this.prismaService.letter.findUnique({
      where: { id: id.getValue() },
    });

    if (!raw) {return null;}

    return Letter.restore({
      id: raw.id,
      userId: raw.userId,
      title: raw.title,
      status: raw.status as LetterStatus,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      sender: raw.sender,
      analysisResult: raw.analysisResult,
      content: raw.content,
    });
  }

  async findByUserId(userId: UserId): Promise<Letter[]> {
    const records = await this.prismaService.letter.findMany({
      where: { userId: userId.getValue() },
      orderBy: { createdAt: 'desc' },
    });
    return records.map(
      (raw) =>
        Letter.restore({
          id: raw.id,
          userId: raw.userId,
          title: raw.title,
          status: raw.status as LetterStatus,
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
          sender: raw.sender,
          analysisResult: raw.analysisResult,
          content: raw.content,
        }),
    );
  }
}
