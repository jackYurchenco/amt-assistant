import { Injectable } from "@nestjs/common";
import { PrismaService } from "@amt-assistant/prisma";
import { Letter, LetterStatus } from "@amt-assistant/letters";
import { ILetterRepository } from "../domain/letter.repository.interface";


@Injectable()
export class PrismaLetterRepository implements ILetterRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(letter: Letter): Promise<void> {
    await this.prismaService.letter.upsert({
      where: { id: letter.id },
      update: {
        title: letter.title,
        status: letter.status,
        sender: letter.sender,
        analysisResult: letter.analysisResult ?? null,
      },
      create: {
        id: letter.id,
        title: letter.title,
        status: letter.status,
        sender: letter.sender,
        analysisResult: letter.analysisResult ?? null,
        createdAt: letter.createdAt,
      },
    });
  }

  async findById(id: string): Promise<Letter | null> {
    const raw = await this.prismaService.letter.findUnique({
      where: { id },
    });

    if (!raw) return null;

    return new Letter(
      raw.id,
      raw.title,
      raw.status as LetterStatus,
      raw.createdAt,
      raw.sender,
      raw.analysisResult,
    );
  }

  async findAll(): Promise<Array<Letter>> {
    const records = await this.prismaService.letter.findMany();
    return records.map(
      (raw) =>
        new Letter(
          raw.id,
          raw.title,
          raw.status as LetterStatus,
          raw.createdAt,
          raw.sender,
          raw.analysisResult,
        ),
    );
  }
}
