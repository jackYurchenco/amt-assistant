import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDocumentDto {
  @ApiProperty({
    description: 'The new original name for the document',
    example: 'my_new_document.pdf',
  })
  @IsString()
  @IsNotEmpty()
  readonly originalName!: string;
}
