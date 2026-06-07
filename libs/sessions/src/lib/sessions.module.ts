import { Module } from '@nestjs/common';
import { SessionsController } from './interface/sessions.controller';

@Module({
  controllers: [SessionsController],
  providers: [],
  exports: [],
})
export class SessionsModule {}
