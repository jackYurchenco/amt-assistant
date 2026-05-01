import { Email, UserId } from '@amt-assistant/domain';
import { User } from '../user.entity';

export abstract class UserReader {
  abstract findById(id: UserId): Promise<User | null>;
  abstract findByEmail(email: Email): Promise<User | null>;
}
