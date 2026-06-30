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
import { UsersModule } from '@amt-assistant/users';

@Module({
  imports: [
    PrismaModule,
    SessionsModule,
    UsersModule,
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
  ],
  exports: [
    JwtAuthGuard,
  ],
})
export class AuthModule {}
