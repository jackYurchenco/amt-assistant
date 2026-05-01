import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { GetUserByIdUseCase } from './application/get-user-by-id/get-user-by-id.use-case';
import { GetAllUsersUseCase } from './application/get-all-users/get-all-users.use-case';
import { CreateUserUseCase } from './application/create-user/create-user.use-case';
import { UsersController } from './interface/users.controller';
import { PrismaModule } from '@amt-assistant/prisma';
import { GetUserByEmailUseCase } from './application/get-user-by-email/get-user-by-email.use-case';
import { UtilCryptoModule } from '@amt-assistant/util-crypto';
import { UserSearcher } from './domain/ports/user-searcher.port';
import { UserWriter } from './domain/ports/user-writer.port';
import { UserReader } from './domain/ports/user-reader.port';
import { UserChecker } from './domain/ports/user-checker.port';

@Module({
  imports: [
    PrismaModule,
    UtilCryptoModule,
  ],
  controllers: [UsersController],
  providers: [
    PrismaUserRepository,
    { provide: UserReader, useExisting: PrismaUserRepository },
    { provide: UserWriter, useExisting: PrismaUserRepository },
    { provide: UserSearcher, useExisting: PrismaUserRepository },
    { provide: UserChecker, useExisting: PrismaUserRepository },
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
    GetAllUsersUseCase,
    CreateUserUseCase,
  ],
  exports: [
    GetUserByEmailUseCase,
  ],
})
export class UsersModule {}
