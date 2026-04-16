import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtTokenService } from './jwt-token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({})
  ],
  providers: [
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
  ],
  exports: [TokenService],
})
export class UtilTokenModule {}
