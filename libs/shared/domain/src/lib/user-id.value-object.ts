import { EntityId } from './entity-id.value-object';

export class UserId extends EntityId<'UserId'> {
  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): UserId {
    return new UserId(id);
  }

  public static generate(): UserId {
    return new UserId(this.generateValue());
  }
}
