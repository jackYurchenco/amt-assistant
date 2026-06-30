import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './interface/auth.controller';
import { UtilCryptoModule } from '@amt-assistant/util-crypto';
import { UtilTokenModule } from '@amt-assistant/util-token';
import { LoginUseCase } from './application/login.use-case';
import { PrismaModule } from '@amt-assistant/prisma';
import { SessionsModule } from '@amt-assistant/sessions';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { AuthUserReader } from './domain/ports/auth-user-reader.port';
import { PrismaAuthUsersRepository } from './infrastructure/prisma-auth-users.repository';

@Module({
  imports: [
    PrismaModule,
    SessionsModule,
    UtilCryptoModule,
    UtilTokenModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    LoginUseCase,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: AuthUserReader,
      useClass: PrismaAuthUsersRepository,
    },
  ],
  exports: [
    JwtAuthGuard,
  ],
})
export class AuthModule {}
