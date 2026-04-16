import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ILoginResponse } from '@amt-assistant/contracts';
import { LoginDto } from './dto/login.dto';
import { LoginUseCase } from '../application/login.use-case';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @ApiOperation({ summary: 'Create a new letter' })
  @ApiResponse({
    status: 201,
    description: 'The letter has been successfully created.'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.'
  })
  async login(@Body() dto: LoginDto): Promise<ILoginResponse> {

    const loginResponse: ILoginResponse = await this.loginUseCase.execute({
      email: dto.email,
      password: dto.password,
    });

    return LoginResponseDto.fromResult(loginResponse);
  }
}
