import { User } from '../user.entity';

export abstract class UserSearcher {
  abstract findAll(): Promise<User[]>;
}
