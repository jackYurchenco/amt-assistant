import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository.interface';
import { GetUserByEmailQuery } from './get-user-by-email.query';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(query: GetUserByEmailQuery) {
    return this.userRepository.findByEmail(query.email);
  }
}
