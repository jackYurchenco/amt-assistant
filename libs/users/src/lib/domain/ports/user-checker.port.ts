import { Email } from '@amt-assistant/domain';

export abstract class UserChecker {
  abstract existsByEmail(email: Email): Promise<boolean>
}
