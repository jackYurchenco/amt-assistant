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
  @Trim()
  @IsString({ message: 'The title must be a string.' })
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty({ message: 'The title cannot be empty.'})
  readonly title!: string;

  @ApiProperty({
    example: 'Stadtwerke Coburg',
    description: 'The person or organization who sent the letter',
    required: false,
  })
  @IsOptional()
  @Trim()
  @IsString({ message: 'The sender must be a string.'})
  @IsNotEmpty({ message: 'The sender cannot be empty.'})
  readonly sender?: string;
}
