import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './interface/auth.controller';
import { UtilCryptoModule } from '@amt-assistant/util-crypto';
import { UtilTokenModule } from '@amt-assistant/util-token';
import { LoginUseCase } from './application/login.use-case';
import { PrismaModule } from '@amt-assistant/prisma';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { AuthUserReader } from './domain/ports/auth-user-reader.port';
import { PrismaAuthUserRepository } from './infrastructure/prisma-auth-user.repository';
import { AuthSessionWriter } from './domain/ports/auth-session-writer.port';
import { PrismaAuthSessionsRepository } from './infrastructure/prisma-auth-sessions.repository';

@Module({
  imports: [
    PrismaModule,
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
      useClass: PrismaAuthUserRepository,
    },
    {
      provide: AuthSessionWriter,
      useClass: PrismaAuthSessionsRepository,
    },
  ],
  exports: [
    JwtAuthGuard,
  ],
})
export class AuthModule {}
