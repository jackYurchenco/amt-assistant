import { IsEmail, IsString, MinLength } from 'class-validator';
import { ILogin } from '@amt-assistant/contracts';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto implements ILogin {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user'
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'The user password (minimum 6 characters)',
    minLength: 6,
    format: 'password'
  })
  @IsString()
  @MinLength(6)
  password!: string;
}
