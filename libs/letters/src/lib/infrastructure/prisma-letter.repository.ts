import { Injectable } from "@nestjs/common";
import { PrismaService } from "@amt-assistant/prisma";
import { ILetterRepository } from "../domain/letter.repository.interface";
import { Letter, LetterStatus } from "../domain/letter.entity";

@Injectable()
export class PrismaLetterRepository implements ILetterRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(letter: Letter): Promise<void> {
     await this.prismaService.letter.upsert({
      where: { id: letter.id },
      update: {
        title: letter.title,
        status: letter.status,
        sender: letter.sender ?? null,
        analysisResult: letter.analysisResult ?? null,
      },
      create: {
        id: letter.id,
        title: letter.title,
        status: letter.status,
        sender: letter.sender ?? null,
        analysisResult: letter.analysisResult ?? null,
        createdAt: letter.createdAt,
        userId: letter.userId,
      },
    });
  }

  async findById(id: string): Promise<Letter | null> {
    const raw = await this.prismaService.letter.findUnique({
      where: { id },
    });

    if (!raw) return null;

    return Letter.restore({
      id: raw.id,
      userId: raw.userId,
      title: raw.title,
      status: raw.status as LetterStatus,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      sender: raw.sender,
      analysisResult: raw.analysisResult,
    });
  }

  async findByUserId(userId: string): Promise<Letter[]> {
    const records = await this.prismaService.letter.findMany({
      where: { userId },
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
        })
    );
  }
}
