import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { CreateLetterUseCase } from "../application/create-letter/create-letter.use-case";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateLetterDto } from "./dto/create-letter.dto";
import { CreateLetterCommand } from "../application/create-letter/create-letter.command";
import { GetLetterDto } from "./dto/get-letter.dto";
import { GetLetterUseCase } from "../application/get-letter/get-letter.use-case";

@Controller('letters')
export class LettersController {
  constructor(
    private readonly createLetterUseCase: CreateLetterUseCase,
    private readonly getLetterUseCase: GetLetterUseCase,
  ) {}

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
  async create(@Body() dto: CreateLetterDto) {
    const mockUserId = '550e8400-e29b-41d4-a716-446655440000';

    const command = new CreateLetterCommand(
      dto.title,
      mockUserId,
      dto.sender
    )

    try {
      return await this.createLetterUseCase.execute(command);
    } catch (error) {
      throw new BadRequestException(error, 'Failed to create letter');
    }
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a specific letter by ID' })
  @ApiResponse({ status: 200, description: 'Letter found successfully' })
  @ApiResponse({ status: 404, description: 'Letter not found' })
  async findOne(@Param() params: GetLetterDto) {
    const letter = await this.getLetterUseCase.execute({ id: params.id });

    if (!letter) {
      throw new NotFoundException(`Letter with ID ${params.id} not found`);
    }

    return letter;
  }
}
