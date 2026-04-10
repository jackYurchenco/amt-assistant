import { Module } from '@nestjs/common';
import { HasherService } from './hasher-service';
import { BcryptHasherService } from './bcrypt-hasher.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: HasherService,
      useClass: BcryptHasherService,
    },
  ],
  exports: [HasherService],
})
export class UtilCryptoModule {}
