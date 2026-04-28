import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IGetLetterByIdInterface } from '@amt-assistant/contracts';
import { Trim } from '@amt-assistant/util-decorators';

export class GetLetterByIdDto implements IGetLetterByIdInterface {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the letter',
    type: String,
    required: true,
    format: 'uuid',
  })
  @IsUUID(4, { message: 'The id must be a valid UUID v4.' })
  @IsNotEmpty({ message: 'The id cannot be empty.' })
  @IsString({ message: 'The id must be a string.' })
  @Trim()
  readonly id!: string;
}
