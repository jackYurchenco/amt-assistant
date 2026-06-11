import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Trim } from '@amt-assistant/util-decorators';
import { IRemoveSessionById } from '@amt-assistant/contracts';

export class RemoveSessionByIdDto implements IRemoveSessionById {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The unique identifier of the session',
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
