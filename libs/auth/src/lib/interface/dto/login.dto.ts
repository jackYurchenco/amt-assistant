import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ILogin } from '@amt-assistant/contracts';
import { ApiProperty } from '@nestjs/swagger';
import { ToLowerCase, Trim } from '@amt-assistant/util-decorators';

export class LoginDto implements ILogin {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
    type: String,
    required: true,
    format: 'email',
  })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'The email cannot be empty.' })
  @IsString({ message: 'The email must be a string.' })
  @ToLowerCase()
  @Trim()
  readonly email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'The user password (minimum 6 characters, maximum 64 characters)',
    type: String,
    required: true,
    format: 'password',
    minLength: 6,
    maxLength: 64,
  })
  @MaxLength(64, { message: 'The password cannot be longer than 64 characters.' })
  @MinLength(6, { message: 'The password must be at least 6 characters long.' })
  @IsNotEmpty({ message: 'The password cannot be empty.' })
  @IsString({ message: 'Password must be a string.' })
  readonly password!: string;
}
