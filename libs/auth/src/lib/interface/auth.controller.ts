import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ILoginResponse } from '@amt-assistant/contracts';
import { LoginDto } from './dto/login.dto';
import { LoginUseCase } from '../application/login.use-case';
import { LoginResponseDto } from './dto/login-response.dto';
import { Email, RawPassword } from '@amt-assistant/domain';
import { Public } from '@amt-assistant/util-decorators';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User authentication' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully logged in.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials.',
  })
  async login(@Body() dto: LoginDto): Promise<ILoginResponse> {

    const loginResponse: ILoginResponse = await this.loginUseCase.execute({
      email: Email.create(dto.email),
      password: RawPassword.create(dto.password),
    });

    return LoginResponseDto.fromResult(loginResponse);
  }
}
