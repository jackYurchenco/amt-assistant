import { ILoginResponse, IUser } from '@amt-assistant/contracts';
import { ApiProperty } from '@nestjs/swagger';

class LoginUserDto implements Pick<IUser, 'id' | 'email'> {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'user@example.com' })
  email!: string;
}

export class LoginResponseDto implements ILoginResponse {
  @ApiProperty({ description: 'JWT access token' })
  accessToken: string;

  @ApiProperty({ description: 'JWT refresh token' })
  refreshToken: string;

  @ApiProperty({
    description: 'Authorized user details',
    type: LoginUserDto
  })
  user: LoginUserDto;

  private constructor(response: ILoginResponse) {
    this.accessToken = response.accessToken;
    this.refreshToken = response.refreshToken;
    this.user = response.user;
  }

  static fromResult(result: ILoginResponse): LoginResponseDto {
    return new LoginResponseDto(result);
  }
}
