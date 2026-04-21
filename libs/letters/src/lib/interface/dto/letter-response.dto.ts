import { Letter } from '../../domain/letter.entity';
import { ILetter, LetterStatus } from '@amt-assistant/contracts';

export class LetterResponseDto implements ILetter {
  id: string;
  userId: string;
  title: string;
  status: LetterStatus;
  createdAt: Date;
  updatedAt: Date;
  sender?: string | null;
  analysisResult?: string | null;

  private constructor(letter: Letter) {
    this.id = letter.id;
    this.userId = letter.userId.getValue();
    this.title = letter.title;
    this.status = letter.status as unknown as LetterStatus; // Cast to shared enum
    this.createdAt = letter.createdAt;
    this.updatedAt = letter.updatedAt;
    this.sender = letter.sender ?? null;
    this.analysisResult = letter.analysisResult ?? null;
  }

  static fromEntity(letter: Letter): LetterResponseDto {
    return new LetterResponseDto(letter);
  }
}
