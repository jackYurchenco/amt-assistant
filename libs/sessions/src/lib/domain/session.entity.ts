import { RefreshToken, SessionId, UserId } from '@amt-assistant/domain';

export class SessionEntity {
  private constructor(
    public readonly id: SessionId,
    public readonly userId: UserId,
    public readonly refreshToken: RefreshToken,
    public readonly expiresAt: Date,
    public readonly userAgent: string | null,
  ) {}

  static create(props: {
    userId: string;
    refreshToken: string;
    expiresAt: Date;
    userAgent?: string | null;
  }): SessionEntity {
    return new SessionEntity(
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
  }): SessionEntity {
    return new SessionEntity(
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
