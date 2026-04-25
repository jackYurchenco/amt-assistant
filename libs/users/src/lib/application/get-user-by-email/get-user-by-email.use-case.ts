import { Injectable } from '@nestjs/common';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import { Email } from '@amt-assistant/domain';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByEmailQuery): Promise<User | null> {
    return this.userRepository.findByEmail(Email.create(query.email));
  }
}
