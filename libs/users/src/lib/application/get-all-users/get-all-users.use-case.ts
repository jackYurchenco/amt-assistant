import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository.interface';
import { User } from '../../domain/user.entity';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
