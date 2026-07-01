import { Body, Controller, Post, HttpStatus, Headers, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ILoginResponse } from '@amt-assistant/contracts';
import { LoginDto } from './dto/login.dto';
import { LoginUseCase } from '../application/login/login.use-case';
import { RefreshTokenUseCase } from '../application/refresh-token/refresh-token.use-case';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Email, RawPassword } from '@amt-assistant/domain';
import { Public } from '@amt-assistant/util-decorators';
import { AuthExceptionFilter } from '../infrastructure/filters/auth-exception.filter';

@Controller('auth')
@UseFilters(AuthExceptionFilter)
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

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
  async login(
    @Body() dto: LoginDto,
    @Headers('user-agent') userAgent?: string,
  ): Promise<LoginResponseDto> {

    const loginResponse: ILoginResponse = await this.loginUseCase.execute({
      email: Email.create(dto.email),
      password: RawPassword.create(dto.password),
      userAgent,
    });

    return LoginResponseDto.fromResult(loginResponse);
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tokens successfully refreshed.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired refresh token.',
  })
  async refresh(
    @Body() dto: RefreshTokenDto,
    @Headers('user-agent') userAgent?: string,
  ): Promise<LoginResponseDto> {
    const response: ILoginResponse = await this.refreshTokenUseCase.execute({
      refreshToken: dto.refreshToken,
      userAgent,
    });

    return LoginResponseDto.fromResult(response);
  }
}
