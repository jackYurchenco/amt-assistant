import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Trim } from '@amt-assistant/util-decorators';
import { IGetSessionsByUserId } from '@amt-assistant/contracts';

export class GetSessionsByUserIdDto implements IGetSessionsByUserId {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
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
