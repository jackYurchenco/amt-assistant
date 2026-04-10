import { Injectable } from '@nestjs/common';
import { HasherService } from './hasher-service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHasherService implements HasherService {
  private readonly SALT_ROUNDS = 10;

  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.SALT_ROUNDS);
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }
}
