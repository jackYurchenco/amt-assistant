import { IsEmail, IsString, MinLength } from 'class-validator';
import { ILogin } from '@amt-assistant/contracts';

export class LoginDto implements ILogin {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
