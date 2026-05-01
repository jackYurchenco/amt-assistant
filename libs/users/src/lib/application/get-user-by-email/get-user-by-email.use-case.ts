import { Injectable } from '@nestjs/common';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { User } from '../../domain/user.entity';
import { Email } from '@amt-assistant/domain';
import { UserReader } from '../../domain/ports/user-reader.port';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private readonly userReader: UserReader) {}

  async execute(query: GetUserByEmailQuery): Promise<User | null> {
    return this.userReader.findByEmail(Email.create(query.email));
  }
}
