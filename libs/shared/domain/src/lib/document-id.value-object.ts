import { EntityId } from './entity-id.value-object';

export class DocumentId extends EntityId<'DocumentId'> {
  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): DocumentId {
    return new DocumentId(id);
  }

  public static generate(): DocumentId {
    return new DocumentId(this.generateValue());
  }
}
