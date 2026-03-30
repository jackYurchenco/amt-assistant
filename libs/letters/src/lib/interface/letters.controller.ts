import { Body, Controller, Post } from "@nestjs/common";
import { CreateLetterUseCase } from "../application/create-letter/create-letter.use-case";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateLetterDto } from "./dto/create-letter.dto";
import { CreateLetterCommand } from "../application/create-letter/create-letter.comman";

@Controller('letters')
export class LettersController {
  constructor(private readonly createLetterUseCase: CreateLetterUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new letter' })
  @ApiResponse({
    status: 201,
    description: 'The letter has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.'
  })
  async create(@Body() createLetterDto: CreateLetterDto) {
    const command = new CreateLetterCommand(
      createLetterDto.title,
      createLetterDto.sender
    )

    return await this.createLetterUseCase.execute(command);
  }
}
