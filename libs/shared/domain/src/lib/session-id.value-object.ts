import { EntityId } from './entity-id.value-object';

export class SessionId extends EntityId<'SessionId'> {
  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): SessionId {
    return new SessionId(id);
  }

  public static generate(): SessionId {
    return new SessionId(this.generateValue());
  }
}
