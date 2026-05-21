import { UserId } from '@amt-assistant/domain';

export class SessionEntity {
  private constructor(
    public readonly id: string,
    public readonly userId: UserId,
    public readonly refreshToken: string,
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
      crypto.randomUUID(),
      UserId.create(props.userId),
      props.refreshToken,
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
      props.id,
      UserId.create(props.userId),
      props.refreshToken,
      props.expiresAt,
      props.userAgent,
    );
  }

  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

}
