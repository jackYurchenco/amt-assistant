import { User } from "../../domain/user.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserCommand } from "./create-user.command";
import { UserRepository } from '../../domain/user.repository';
import { HasherService } from '@amt-assistant/util-crypto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasherService: HasherService
  ) {}

  async execute(command: CreateUserCommand) {

    const hashed = await this.hasherService.hash(command.passwordHash);

    const user: User = User.create({
      email: command.email,
      passwordHash: hashed,
    });

    await this.userRepository.save(user);

    return user;
  }
}
