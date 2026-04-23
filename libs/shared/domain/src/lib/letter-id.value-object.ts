import { EntityId } from './entity-id.value-object';

export class LetterId extends EntityId<'LetterId'> {
  private constructor(id: string) {
    super(id);
  }

  public static create(id: string): LetterId {
    return new LetterId(id);
  }

  public static generate(): LetterId {
    return new LetterId(this.generateValue());
  }
}
