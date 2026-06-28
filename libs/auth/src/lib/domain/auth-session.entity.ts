import { UserId, SessionId, RefreshToken } from '@amt-assistant/domain';
import { DomainValidationException } from '@amt-assistant/exceptions';

export class AuthSession {
  private constructor(
    public readonly id: SessionId,
    public readonly userId: UserId,
    public readonly refreshToken: RefreshToken,
    public readonly expiresAt: Date,
    public readonly userAgent?: string,
  ) {}

  static create(props: {
    id: string;
    userId: string;
    refreshToken: string;
    expiresAt: Date;
    userAgent?: string;
  }): AuthSession {
    if (props.expiresAt.getTime() <= Date.now()) {
      throw new DomainValidationException('Session expiration date must be in the future.');
    }

    return new AuthSession(
      SessionId.create(props.id),
      UserId.create(props.userId),
      RefreshToken.create(props.refreshToken),
      props.expiresAt,
      props.userAgent,
    );
  }

  static restore(props: {
    id: string;
    userId: string;
    refreshToken: string;
    expiresAt: Date;
    userAgent?: string;
  }): AuthSession {
    return new AuthSession(
      SessionId.create(props.id),
      UserId.create(props.userId),
      RefreshToken.create(props.refreshToken),
      props.expiresAt,
      props.userAgent,
    );
  }
}
