import { EntityId } from './entity-id.value-object';

export class UserId extends EntityId<'UserId'> {
  static create(id: string): UserId {
    return new UserId(id);
  }

  static generate(): UserId {
    return new UserId(this.generateValue());
  }
}
