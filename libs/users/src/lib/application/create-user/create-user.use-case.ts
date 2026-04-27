import { User } from '../../domain/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from '../../domain/user.repository';
import { HasherService } from '@amt-assistant/util-crypto';
import { PasswordHash } from '@amt-assistant/domain';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasherService: HasherService,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {

    const hashed: string = await this.hasherService.hash(command.password);

    const user: User = User.create({
      email: command.email,
      passwordHash: PasswordHash.create(hashed),
    });

    await this.userRepository.save(user);

    return user;
  }
}
