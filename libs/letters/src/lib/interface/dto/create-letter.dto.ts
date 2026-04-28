import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ICreateLetter } from '@amt-assistant/contracts';
import { Transform } from 'class-transformer';

export class CreateLetterDto implements ICreateLetter {
  @ApiProperty({
    example: 'Rechnung für Strom',
    description: 'The subject or title of the letter',
    required: true,
  })
  @IsString({ message: 'The title must be a string.' })
  @IsNotEmpty({ message: 'The title cannot be empty.'})
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(3)
  @MaxLength(100)
  readonly title!: string;

  @ApiProperty({
    example: 'Stadtwerke Coburg',
    description: 'The person or organization who sent the letter',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'The sender must be a string.'})
  @IsNotEmpty({ message: 'The sender cannot be empty.'})
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  readonly sender?: string;
}
