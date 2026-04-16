import { Module } from '@nestjs/common';
import { AuthController } from './interface/auth.controller';
import { UtilCryptoModule } from '@amt-assistant/util-crypto';
import { UtilTokenModule } from '@amt-assistant/util-token';
import { LoginUseCase } from './application/login.use-case';
import { UsersModule } from '@amt-assistant/users';

@Module({
  imports: [
    UsersModule,
    UtilCryptoModule,
    UtilTokenModule,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    LoginUseCase,
  ],
  exports: [],
})
export class AuthModule {}
