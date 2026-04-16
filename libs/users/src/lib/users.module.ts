import { Module } from '@nestjs/common';
import { PrismaUserRepository } from "./infrastructure/prisma-user.repository";
import { GetUserByIdUseCase } from "./application/get-user-by-id/get-user-by-id.use-case";
import { GetAllUsersUseCase } from "./application/get-all-users/get-all-users.use-case";
import { CreateUserUseCase } from "./application/create-user/create-user.use-case";
import { UsersController } from "./interface/users.controller";
import { PrismaModule } from '@amt-assistant/prisma';
import { UserRepository } from './domain/user.repository';
import { GetUserByEmailUseCase } from './application/get-user-by-email/get-user-by-email.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
    GetAllUsersUseCase,
    CreateUserUseCase
  ],
  exports: [
    UserRepository,
    GetUserByEmailUseCase
  ]
})
export class UsersModule {}
