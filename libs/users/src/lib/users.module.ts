import { Module } from '@nestjs/common';
import { IUserRepository } from "./domain/user.repository.interface";
import { PrismaUserRepository } from "./infrastructure/prisma-user.repository";
import { GetUserByIdUseCase } from "./application/get-user-by-id/get-user-by-id.use-case";


@Module({
  controllers: [],
  providers: [
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    GetUserByIdUseCase
  ],
  exports: [],
})
export class UsersModule {}
