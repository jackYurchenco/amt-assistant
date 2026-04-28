import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IGetLettersByUserIdDto } from '@amt-assistant/contracts';
import { Trim } from '@amt-assistant/util-decorators';

export class GetLettersByUserIdDto implements IGetLettersByUserIdDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the user',
    type: String,
    required: true,
  })
  @IsUUID(4, { message: 'The userId must be a valid UUID v4.' })
  @IsNotEmpty({ message: 'The userId cannot be empty.' })
  @IsString({ message: 'The userId must be a string.' })
  @Trim()
  readonly userId!: string;
}
