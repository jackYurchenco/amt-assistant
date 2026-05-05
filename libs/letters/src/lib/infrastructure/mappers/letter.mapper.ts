import { Letter as PrismaLetter } from '@prisma/client';
import { Letter } from '../../domain/letter.entity';
import { LetterStatus } from '@amt-assistant/contracts';

export class LetterMapper {
  static toDomain(raw: PrismaLetter): Letter {
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

  static toPersistence(letter: Letter): PrismaLetter {
    return {
      id: letter.id.getValue(),
      userId: letter.userId.getValue(),
      title: letter.title,
      status: letter.status,
      createdAt: letter.createdAt,
      updatedAt: letter.updatedAt,
      sender: letter.sender ?? null,
      analysisResult: letter.analysisResult ?? null,
      content: letter.content ?? null,
    };
  }
}
