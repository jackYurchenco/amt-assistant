import { Module } from '@nestjs/common';
import { AuthController } from './interface/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AuthModule {}
