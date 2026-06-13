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

  @ApiProperty({
    example: 'b2c3d4e5-f6a7-8901-2345-67890abcdef1',
    description: 'The unique identifier of the user',
    type: String,
    required: true,
    format: 'uuid',
  })
  @IsUUID(4, { message: 'The userId must be a valid UUID v4.' })
  @IsNotEmpty({ message: 'The userId cannot be empty.' })
  @IsString({ message: 'The userId must be a string.' })
  @Trim()
  readonly userId!: string;
}
