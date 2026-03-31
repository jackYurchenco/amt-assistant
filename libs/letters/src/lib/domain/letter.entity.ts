import { v4 as uuidv4 } from "uuid";

export enum LetterStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export class Letter {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public title: string,
    public status: LetterStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public sender?: string | null,
    public analysisResult?: string | null,
  ) {
    if (!userId) throw new Error('Letter must belong to a user');
    if (!title) throw new Error('Letter title cannot be empty');
  }

  static create(props: {
    userId: string;
    title: string
  }): Letter {
    const now = new Date();
    return new Letter(
      uuidv4(),
      props.userId,
      props.title,
      LetterStatus.PENDING,
      now,
      now,
      null,
      null
    )
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
  }){
    return new Letter(
      props.id,
      props.userId,
      props.title,
      props.status,
      props.createdAt,
      props.updatedAt,
      props.sender,
      props.analysisResult
    );
  }
}
