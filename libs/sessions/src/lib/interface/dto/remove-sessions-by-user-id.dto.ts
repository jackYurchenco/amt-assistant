import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Trim } from '@amt-assistant/util-decorators';
import { IRemoveSessionsByUserId } from '@amt-assistant/contracts';

export class RemoveSessionsByUserIdDto implements IRemoveSessionsByUserId {
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
