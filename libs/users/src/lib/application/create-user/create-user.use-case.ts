import { User } from "../../domain/user.entity";
import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/user.repository.interface";
import { CreateUserCommand } from "./create-user.command";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: CreateUserCommand) {

    const user: User = User.create({
      email: command.email,
      passwordHash: command.passwordHash,
    });

    await this.userRepository.save(user);

    return user;
  }
}
