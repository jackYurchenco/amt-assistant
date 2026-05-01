import { LetterStatus } from '@amt-assistant/contracts';
import { LetterId, UserId } from '@amt-assistant/domain';

export class Letter {
  private constructor(
    public readonly id: LetterId,
    public readonly userId: UserId,
    public readonly title: string,
    public readonly status: LetterStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly sender?: string | null,
    public readonly analysisResult?: string | null,
    public readonly content?: string | null,
  ) {
    if (!title) {throw new Error('Letter title cannot be empty');}
  }

  static create(props: {
    userId: string;
    title: string;
    sender?: string | null;
  }): Letter {
    const now = new Date();
    return new Letter(
      LetterId.generate(),
      UserId.create(props.userId),
      props.title,
      LetterStatus.PENDING,
      now,
      now,
      props.sender,
      null,
      null,
    );
  }

  static restore(props: {
    id: string;
    userId: string;
    title: string;
    status: LetterStatus;
    createdAt: Date;
    updatedAt: Date;
    sender?: string | null;
    analysisResult?: string | null;
    content?: string | null;
  }): Letter {
    return new Letter(
      LetterId.create(props.id),
      UserId.create(props.userId),
      props.title,
      props.status,
      props.createdAt,
      props.updatedAt,
      props.sender,
      props.analysisResult,
      props.content,
    );
  }
}
