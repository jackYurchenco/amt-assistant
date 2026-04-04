import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetUserByIdDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    format: 'uuid',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @IsUUID()
  id!: string;
}
