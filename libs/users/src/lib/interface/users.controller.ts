import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../application/create-user/create-user.use-case";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserCommand } from "../application/create-user/create-user.command";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
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
  async create(@Body() dto: CreateUserDto) {
    const command = new CreateUserCommand(
      dto.email,
      dto.passwordHash
    );
    return await this.createUserUseCase.execute(command);
  }
}
