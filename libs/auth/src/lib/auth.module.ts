import { Module } from '@nestjs/common';
import { AuthController } from './interface/auth.controller';
import { UtilCryptoModule } from '@amt-assistant/util-crypto';
import { UtilTokenModule } from '@amt-assistant/util-token';

@Module({
  imports: [
    UtilCryptoModule,
    UtilTokenModule
  ],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AuthModule {}
