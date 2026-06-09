import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ISession } from '@amt-assistant/contracts';
import { Session } from '../../domain/session.entity';

export class SessionResponseDto implements ISession {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The unique identifier of the session',
    format: 'uuid',
  })
  readonly id: string;

  @ApiProperty({
    example: 'user-id-uuid',
    description: 'The unique identifier of the user',
    format: 'uuid',
  })
  readonly userId: string;

  @ApiProperty({
    example: 'refresh-token-string',
    description: 'The refresh token for this session',
  })
  readonly refreshToken: string;

  @ApiProperty({
    example: '2023-01-01T12:00:00Z',
    description: 'The expiration date of the session',
  })
  readonly expiresAt: Date;

  @ApiPropertyOptional({
    example: 'Mozilla/5.0 ...',
    description: 'The user agent that created the session',
  })
  readonly userAgent: string | null;

  @ApiProperty({
    example: false,
    description: 'Whether the session is expired',
  })
  readonly isExpired: boolean;

  private constructor(session: Session) {
    this.id = session.id.getValue();
    this.userId = session.userId.getValue();
    this.refreshToken = session.refreshToken.getValue();
    this.expiresAt = session.expiresAt;
    this.userAgent = session.userAgent;
    this.isExpired = session.isExpired();
  }

  static fromEntity(session: Session): SessionResponseDto {
    return new SessionResponseDto(session);
  }
}
