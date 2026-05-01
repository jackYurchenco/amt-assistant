import { LetterStatus } from './letter-status.enum';

export interface ILetter {
  id: string;
  userId: string;
  title: string;
  status: LetterStatus;
  createdAt: Date;
  updatedAt: Date;
  sender?: string | null;
  analysisResult?: string | null;
  content?: string | null;
}
