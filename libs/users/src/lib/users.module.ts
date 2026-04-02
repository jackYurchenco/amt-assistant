import { Module } from '@nestjs/common';
import { IUserRepository } from "./domain/user.repository.interface";
import { PrismaUserRepository } from "./infrastructure/prisma-user.repository";


@Module({
  controllers: [],
  providers: [
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    }
  ],
  exports: [],
})
export class UsersModule {}
