import { UserId, DocumentId } from '@amt-assistant/domain';
import { DocumentStatus } from '@amt-assistant/contracts';
import { DomainValidationException } from '@amt-assistant/exceptions';

export class Document {
  private constructor(
    public readonly id: DocumentId,
    public readonly userId: UserId,
    public readonly originalName: string,
    public readonly filename: string,
    public readonly path: string,
    public readonly mimeType: string,
    public readonly size: number,
    public readonly status: DocumentStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    if (!originalName) { throw new DomainValidationException('Document originalName cannot be empty'); }
    if (!filename) { throw new DomainValidationException('Document filename cannot be empty'); }
  }

  static create(props: {
    userId: string;
    originalName: string;
    filename: string;
    path: string;
    mimeType: string;
    size: number;
  }): Document {
    const now = new Date();
    return new Document(
      DocumentId.generate(),
      UserId.create(props.userId),
      props.originalName,
      props.filename,
      props.path,
      props.mimeType,
      props.size,
      DocumentStatus.UPLOADED,
      now,
      now,
    );
  }

  static restore(props: {
    id: string;
    userId: string;
    originalName: string;
    filename: string;
    path: string;
    mimeType: string;
    size: number;
    status: DocumentStatus;
    createdAt: Date;
    updatedAt: Date;
  }): Document {
    return new Document(
      DocumentId.create(props.id),
      UserId.create(props.userId),
      props.originalName,
      props.filename,
      props.path,
      props.mimeType,
      props.size,
      props.status,
      props.createdAt,
      props.updatedAt,
    );
  }
}
