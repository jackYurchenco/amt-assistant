import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/user.repository.interface";
import { GetUserByIdQuery } from "./get-user-by-id.query";
import { User } from "../../domain/user.entity";

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User | null> {
    return this.userRepository.findById(query.id);
  }
}
