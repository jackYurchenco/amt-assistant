import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ICreateUser } from '@amt-assistant/contracts';

export class CreateUserDto implements ICreateUser {
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'The email cannot be empty.' })
  email!: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user.' })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'The password cannot be empty.' })
  @MinLength(6, { message: 'The password must be at least 6 characters long.' })
  @MaxLength(64, { message: 'The password cannot be longer than 64 characters.' })
  password!: string;
}
