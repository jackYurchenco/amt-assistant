import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateUserUseCase } from "../application/create-user/create-user.use-case";
import { GetUserByIdUseCase } from "../application/get-user-by-id/get-user-by-id.use-case";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserCommand } from "../application/create-user/create-user.command";
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { User } from '../domain/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.'
  })
  async create(@Body() dto: CreateUserDto): Promise<User> {
    const command = new CreateUserCommand(
      dto.email,
      dto.passwordHash
    );
    return await this.createUserUseCase.execute(command);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.'
  })
  async findOne(@Param() dto: GetUserByIdDto): Promise<User> {
    const user = await this.getUserByIdUseCase.execute({ id : dto.id });

    if (!user) {
      throw new NotFoundException(`User with ID ${dto.id} not found`);
    }

    return user;
  }
}
