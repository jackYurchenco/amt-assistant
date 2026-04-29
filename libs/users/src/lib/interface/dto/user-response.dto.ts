import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUser } from '@amt-assistant/contracts';
import { User } from '../../domain/user.entity';

export class UserResponseDto implements IUser {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The unique identifier of the user',
    format: 'uuid',
  })
  readonly id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
    format: 'email',
  })
  readonly email: string;

  @ApiProperty({
    example: '2023-01-01T12:00:00Z',
    description: 'The creation date of the user'
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T12:00:00Z',
    description: 'The last update date of the user',
  })
  readonly updatedAt: Date;

  @ApiPropertyOptional({
    example: 'John',
    description: 'The first name of the user',
    nullable: true,
  })
  readonly firstName?: string | null;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'The last name of the user',
    nullable: true,
  })
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
