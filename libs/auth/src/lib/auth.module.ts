import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './interface/auth.controller';
import { UtilCryptoModule } from '@amt-assistant/util-crypto';
import { UtilTokenModule } from '@amt-assistant/util-token';
import { LoginUseCase } from './application/login.use-case';
import { PrismaModule } from '@amt-assistant/prisma';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { AuthUserReader } from './domain/ports/auth-user.reader';
import { PrismaAuthUserRepository } from './infrastructure/prisma-auth-user.repository';

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
  ],
  exports: [
    JwtAuthGuard,
  ],
})
export class AuthModule {}
