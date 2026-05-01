import { User } from '../user.entity';

export abstract class UserWriter {
  abstract create(user: User): Promise<void>;

  abstract update(user: User): Promise<void>;
}
