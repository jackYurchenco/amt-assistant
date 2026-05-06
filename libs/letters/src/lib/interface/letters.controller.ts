import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CreateLetterUseCase } from '../application/create-letter/create-letter.use-case';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLetterDto } from './dto/create-letter.dto';
import { CreateLetterCommand } from '../application/create-letter/create-letter.command';
import { GetLetterByIdDto } from './dto/get-letter-by-id.dto';
import { GetLetterByIdUseCase } from '../application/get-letter-by-id/get-letter-by-id.use-case';
import { GetLettersByUserIdDto } from './dto/get-letters-by-user-id.dto';
import { GetLettersByUserIdUseCase } from '../application/get-letters-by-user-id/get-letters-by-user-id.use-case';
import { Letter } from '../domain/letter.entity';
import { LetterResponseDto } from './dto/letter-response.dto';
import { ILetter } from '@amt-assistant/contracts';

@ApiTags('letters')
@Controller('letters')
export class LettersController {
  constructor(
    private readonly createLetterUseCase: CreateLetterUseCase,
    private readonly getLetterByIdUseCase: GetLetterByIdUseCase,
    private readonly getLettersByUserIdUseCase: GetLettersByUserIdUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new letter' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The letter has been successfully created.',
    type: LetterResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async create(@Body() dto: CreateLetterDto): Promise<ILetter> {
    // TODO: Replace with actual user ID from execution context (e.g., JWT)
    const mockUserId = '550e8400-e29b-41d4-a716-446655440000';

    const command = new CreateLetterCommand(
      dto.title,
      mockUserId,
      dto.sender,
    );

    const letter: Letter = await this.createLetterUseCase.execute(command);

    return LetterResponseDto.fromEntity(letter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific letter by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Letter found successfully',
    type: LetterResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Letter not found',
  })
  async findOne(@Param() dto: GetLetterByIdDto): Promise<ILetter> {
    const letter: Letter = await this.getLetterByIdUseCase.execute({ id: dto.id });

    return LetterResponseDto.fromEntity(letter);
  }

  @Get()
  @ApiOperation({ summary: 'Get all letters for a specific user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of letters retrieved successfully.',
    type: [LetterResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async findByUser(@Query() dto: GetLettersByUserIdDto): Promise<ILetter[]> {
    const letters: Letter[] = await this.getLettersByUserIdUseCase.execute({ userId: dto.userId });

    return letters.map(letter => LetterResponseDto.fromEntity(letter));
  }
}
