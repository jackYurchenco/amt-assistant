import { Injectable } from '@nestjs/common';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { UserRepository } from '../../domain/user.repository';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByEmailQuery) {
    return this.userRepository.findByEmail(query.email);
  }
}
