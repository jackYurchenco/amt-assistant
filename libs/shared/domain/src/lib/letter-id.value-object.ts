import { EntityId } from './entity-id.value-object';

export class LetterId extends EntityId<'LetterId'> {
  static create(id: string): LetterId {
    return new LetterId(id);
  }

  static generate(): LetterId {
    return new LetterId(this.generateValue());
  }
}
