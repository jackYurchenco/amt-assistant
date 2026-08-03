import { RefreshToken, SessionId, UserId } from '@amt-assistant/domain';
import { DomainValidationException } from '@amt-assistant/exceptions';

export class Session {
  private constructor(
    public readonly id: SessionId,
    public readonly userId: UserId,
    public readonly refreshToken: RefreshToken,
    public readonly expiresAt: Date,
    public readonly userAgent: string | null,
  ) {
    if (!expiresAt) {
      throw new DomainValidationException('Session expiration date is required');
    }
  }

  static create(props: {
    userId: string;
    refreshToken: string;
    expiresAt: Date;
    userAgent?: string | null;
  }): Session {
    if (props.expiresAt <= new Date()) {
      throw new DomainValidationException('Cannot create a session with an expiration date in the past');
    }

    return new Session(
      SessionId.create(crypto.randomUUID()),
      UserId.create(props.userId),
      RefreshToken.create(props.refreshToken),
      props.expiresAt,
      props.userAgent ?? null,
    );
  }

  static restore(props: {
    id: string;
    userId: string;
    refreshToken: string;
    expiresAt: Date;
    userAgent: string | null;
  }): Session {
    return new Session(
      SessionId.create(props.id),
      UserId.create(props.userId),
      RefreshToken.create(props.refreshToken),
      props.expiresAt,
      props.userAgent,
    );
  }

  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

}
