import { IUser } from '@amt-assistant/contracts';
import { User } from '../../domain/user.entity';

export class UserResponseDto implements IUser {
  readonly id: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly firstName?: string | null;
  readonly lastName?: string | null;

  private constructor(user: User) {
    this.id = user.id.getValue();
    this.email = user.email.getValue();
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.firstName = user.firstName ?? null;
    this.lastName = user.lastName ?? null;
  }

  static fromEntity(user: User): UserResponseDto {
    return new UserResponseDto(user);
  }
}
