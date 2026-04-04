import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ICreateLetter } from '@amt-assistant/contracts';

export class CreateLetterDto implements ICreateLetter {
  @ApiProperty({
    example: 'Rechnung für Strom',
    description: 'The subject or title of the letter',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  readonly title!: string;

  @ApiProperty({
    example: 'Stadtwerke Coburg',
    description: 'The person or organization who sent the letter',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly sender?: string;
}
