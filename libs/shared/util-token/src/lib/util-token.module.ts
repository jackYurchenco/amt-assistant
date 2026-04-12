import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtTokenService } from './jwt-token.service';

@Module({
  providers: [
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
  ],
  exports: [TokenService],
})
export class UtilTokenModule {}
