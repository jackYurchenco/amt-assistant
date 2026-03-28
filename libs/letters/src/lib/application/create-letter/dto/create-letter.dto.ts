import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateLetterDto {
  @ApiProperty({
    example: "Rechnung für Strom",
    description: "The subject or title of the letter"
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title!: string;

  @ApiProperty({
    example: "Stadtwerke Coburg",
    description: "The person or organization who sent the letter"
  })
  @IsString()
  @IsNotEmpty()
  sender?: string;
}
