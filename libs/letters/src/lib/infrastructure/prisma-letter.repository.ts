import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@amt-assistant/prisma';
import { Letter } from '../domain/letter.entity';
import { Prisma } from '@prisma/client';
import { LetterStatus } from '@amt-assistant/contracts';
import { LetterRepository } from '../domain/letter.repository';
import { LetterId, UserId } from '@amt-assistant/domain';

@Injectable()
export class PrismaLetterRepository implements LetterRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(letter: Letter): Promise<void> {
    try {
      await this.prismaService.letter.upsert({
        where: { id: letter.id.getValue() },
        update: {
          title: letter.title,
          status: letter.status,
          sender: letter.sender ?? null,
          analysisResult: letter.analysisResult ?? null,
          content: letter.content ?? null,
        },
        create: {
          id: letter.id.getValue(),
          userId: letter.userId.getValue(),
          title: letter.title,
          status: letter.status,
          createdAt: letter.createdAt,
          sender: letter.sender ?? null,
          analysisResult: letter.analysisResult ?? null,
          content: letter.content ?? null,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2003':
            throw new NotFoundException(`User with ID ${letter.userId} not found`);
        }
      }
      throw error;
    }
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
