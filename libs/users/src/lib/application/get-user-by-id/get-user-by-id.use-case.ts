import { Injectable } from '@nestjs/common';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { UserId } from '@amt-assistant/domain';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<User | null> {
    return this.userRepository.findById(UserId.create(query.id));
  }
}
