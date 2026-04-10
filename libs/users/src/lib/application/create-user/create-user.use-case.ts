import { User } from "../../domain/user.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserCommand } from "./create-user.command";
import { UserRepository } from '../../domain/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand) {

    const user: User = User.create({
      email: command.email,
      passwordHash: command.passwordHash,
    });

    await this.userRepository.save(user);

    return user;
  }
}
