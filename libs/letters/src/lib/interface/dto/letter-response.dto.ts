import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Letter } from '../../domain/letter.entity';
import { ILetter, LetterStatus } from '@amt-assistant/contracts';

export class LetterResponseDto implements ILetter {
  @ApiProperty({
    description: 'Unique letter identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly id: string;

  @ApiProperty({
    description: 'User identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly userId: string;

  @ApiProperty({
    description: 'Letter title',
    example: 'Interview invitation',
  })
  readonly title: string;

  @ApiProperty({
    enum: LetterStatus,
    description: 'Current letter status',
    example: LetterStatus.PENDING,
  })
  readonly status: LetterStatus;

  @ApiProperty({
    description: 'Creation date',
    example: '2023-10-01T12:00:00.000Z',
  })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2023-10-01T12:00:00.000Z',
  })
  readonly updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Letter sender',
    example: 'John Doe',
    nullable: true,
  })
  readonly sender?: string | null;

  @ApiPropertyOptional({
    description: 'Letter analysis result',
    example: 'The text of the letter looks polite.',
    nullable: true,
  })
  readonly analysisResult?: string | null;

  @ApiPropertyOptional({
    description: 'Letter content result',
    example: 'The content of the letter looks polite.',
    nullable: true,
  })
  readonly content?: string | null;

  private constructor(letter: Letter) {
    this.id = letter.id.getValue();
    this.userId = letter.userId.getValue();
    this.title = letter.title;
    this.status = letter.status as unknown as LetterStatus;
    this.createdAt = letter.createdAt;
    this.updatedAt = letter.updatedAt;
    this.sender = letter.sender ?? null;
    this.analysisResult = letter.analysisResult ?? null;
    this.content = letter.content ?? null;
  }

  static fromEntity(letter: Letter): LetterResponseDto {
    return new LetterResponseDto(letter);
  }
}
