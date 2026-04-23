import { IUser } from '@amt-assistant/contracts';
import { User } from '../../domain/user.entity';

export class UserResponseDto implements IUser {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  firstName?: string | null;
  lastName?: string | null;

  private constructor(user: User) {
    this.id = user.id.getValue();
    this.email = user.email.getValue();
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.firstName = user.firstName ?? null;
    this.lastName = user.lastName ?? null;
  }

  static fromEntity(user: User): UserResponseDto {
    return new UserResponseDto(user);
  }
}
