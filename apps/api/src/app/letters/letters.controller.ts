import { Body, Controller, Post } from "@nestjs/common";
import { CreateLetterDto, CreateLetterUseCase } from "@amt-assistant/letters";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

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
    return await this.createLetterUseCase.execute(createLetterDto);
  }
}
