import { ILoginResponse, IUser } from '@amt-assistant/contracts';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

class LoginUserDto implements Pick<IUser, 'id' | 'email'> {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the user',
    type: String,
    required: true,
    format: 'uuid',
  })
  @IsUUID(4)
  @IsNotEmpty()
  @IsString()
  readonly id!: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
    type: String,
    required: true,
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email!: string;
}

export class LoginResponseDto implements ILoginResponse {
  @ApiProperty({
    description: 'JWT access token',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly accessToken!: string;

  @ApiProperty({
    description: 'JWT refresh token',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly refreshToken!: string;

  @ApiProperty({
    description: 'Authorized user details',
    type: LoginUserDto,
    required: true,
  })
  @Type(() => LoginUserDto)
  readonly user!: LoginUserDto;

  private constructor(response: ILoginResponse) {
    this.accessToken = response.accessToken;
    this.refreshToken = response.refreshToken;
    this.user = response.user;
  }

  static fromResult(result: ILoginResponse): LoginResponseDto {
    return new LoginResponseDto(result);
  }
}
