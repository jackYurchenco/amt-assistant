import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ICreateUser } from '@amt-assistant/contracts';
import { Trim } from '@amt-assistant/util-decorators';

export class CreateUserDto implements ICreateUser {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user.',
    type: String,
    required: true,
    format: 'email',
  })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'The email cannot be empty.' })
  @IsString({ message: 'The email must be a string.' })
  @Trim()
  readonly email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user.',
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
