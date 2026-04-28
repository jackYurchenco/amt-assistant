import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ICreateLetter } from '@amt-assistant/contracts';
import { Trim } from '@amt-assistant/util-decorators';

export class CreateLetterDto implements ICreateLetter {
  @ApiProperty({
    example: 'Rechnung für Strom',
    description: 'The subject or title of the letter',
    required: true,
  })
  @MaxLength(100)
  @MinLength(3)
  @IsNotEmpty({ message: 'The title cannot be empty.'})
  @IsString({ message: 'The title must be a string.' })
  @Trim()
  readonly title!: string;

  @ApiProperty({
    example: 'Stadtwerke Coburg',
    description: 'The person or organization who sent the letter',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'The sender cannot be empty.'})
  @IsString({ message: 'The sender must be a string.'})
  @Trim()
  readonly sender?: string;
}
