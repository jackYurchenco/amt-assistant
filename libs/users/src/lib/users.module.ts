import { Module } from '@nestjs/common';
import { IUserRepository } from "./domain/user.repository.interface";
import { PrismaUserRepository } from "./infrastructure/prisma-user.repository";
import { GetUserByIdUseCase } from "./application/get-user-by-id/get-user-by-id.use-case";
import { GetAllUsersUseCase } from "./application/get-all-users/get-all-users.use-case";
import { UsersController } from "./interface/users.controller";

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    GetUserByIdUseCase,
    GetAllUsersUseCase
  ]
})
export class UsersModule {}
