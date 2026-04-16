import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../application/create-user/create-user.use-case';
import { GetUserByIdUseCase } from '../application/get-user-by-id/get-user-by-id.use-case';
import { GetAllUsersUseCase } from '../application/get-all-users/get-all-users.use-case';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserCommand } from '../application/create-user/create-user.command';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { User } from '../domain/user.entity';
import { IUser } from '@amt-assistant/contracts';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async create(@Body() dto: CreateUserDto): Promise<IUser> {
    const command = new CreateUserCommand(
      dto.email,
      dto.passwordHash,
    );
    const user: User = await this.createUserUseCase.execute(command);
    return UserResponseDto.fromEntity(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully retrieved.',
    type: [User],
  })
  async findAll(): Promise<IUser[]> {
    const users: User[] = await this.getAllUsersUseCase.execute();
    return users.map(user => UserResponseDto.fromEntity(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async findOne(@Param() dto: GetUserByIdDto): Promise<IUser> {
    const user = await this.getUserByIdUseCase.execute({ id : dto.id });

    if (!user) {
      throw new NotFoundException(`User with ID ${dto.id} not found`);
    }

    return UserResponseDto.fromEntity(user);
  }
}
