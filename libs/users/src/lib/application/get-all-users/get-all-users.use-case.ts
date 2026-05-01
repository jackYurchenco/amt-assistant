import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { UserSearcher } from '../../domain/ports/user-searcher.port';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userSearcher: UserSearcher) {}

  async execute(): Promise<User[]> {
    return this.userSearcher.findAll();
  }
}
