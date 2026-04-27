import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ILoginResponse } from '@amt-assistant/contracts';
import { LoginDto } from './dto/login.dto';
import { LoginUseCase } from '../application/login.use-case';
import { LoginResponseDto } from './dto/login-response.dto';
import { Email } from '@amt-assistant/domain';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @ApiOperation({ summary: 'User authentication' })
  @ApiResponse({
    status: 201,
    description: 'User successfully logged in.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
  })
  async login(@Body() dto: LoginDto): Promise<ILoginResponse> {

    const loginResponse: ILoginResponse = await this.loginUseCase.execute({
      email: Email.create(dto.email),
      password: dto.password,
    });

    return LoginResponseDto.fromResult(loginResponse);
  }
}
