import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class GetLetterByIdDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The unique identifier of the letter"
  })
  @IsUUID(4)
  @IsNotEmpty()
  readonly id!: string;
}
