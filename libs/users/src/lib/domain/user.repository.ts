import { User } from './user.entity';
import { Email, UserId } from '@amt-assistant/domain';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract findById(id: UserId): Promise<User | null>;
  abstract findByEmail(email: Email): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
}
