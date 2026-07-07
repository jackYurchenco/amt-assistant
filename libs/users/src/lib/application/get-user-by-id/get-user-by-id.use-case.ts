import { Injectable } from '@nestjs/common';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { User } from '../../domain/user.entity';
import { UserId } from '@amt-assistant/domain';
import { UserReader } from '../../domain/ports/user-reader.port';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userReader: UserReader) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const user = await this.userReader.findById(UserId.create(query.id));

    if (!user) {
      throw new UserNotFoundException(`User with ID ${query.id} not found`);
    }

    return user;
  }
}
