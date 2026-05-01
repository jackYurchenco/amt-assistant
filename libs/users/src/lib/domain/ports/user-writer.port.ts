import { User } from '../user.entity';

export abstract class UserWriter {
  abstract save(user: User): Promise<void>;
}
