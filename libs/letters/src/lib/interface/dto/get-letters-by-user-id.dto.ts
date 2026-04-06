import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { IGetLettersByUserIdDto } from '@amt-assistant/contracts';

export class GetLettersByUserIdDto implements IGetLettersByUserIdDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The unique identifier of the user"
  })
  @IsUUID(4)
  @IsNotEmpty()
  readonly userId!: string;
}
