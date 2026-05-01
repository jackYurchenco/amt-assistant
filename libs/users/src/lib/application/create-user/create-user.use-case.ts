import { User } from '../../domain/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { HasherService } from '@amt-assistant/util-crypto';
import { PasswordHash } from '@amt-assistant/domain';
import { UserChecker } from '../../domain/ports/user-checker.port';
import { UserWriter } from '../../domain/ports/user-writer.port';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly hasherService: HasherService,
    private readonly userChecker: UserChecker,
    private readonly userWriter: UserWriter,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const existingUser: boolean = await this.userChecker.existsByEmail(command.email);

    if (existingUser) {
      throw new ConflictException(`User with email ${command.email.getValue()} already exists`);
    }

    const hashed: string = await this.hasherService.hash(command.password.getValue());

    const user: User = User.create({
      email: command.email,
      passwordHash: PasswordHash.create(hashed),
    });

    await this.userWriter.create(user);

    return user;
  }
}
