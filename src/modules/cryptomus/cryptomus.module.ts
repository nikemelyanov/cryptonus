import { Module } from '@nestjs/common';
import { CryptomusService } from './cryptomus.service';
import { CryptomusController } from './cryptomus.controller';

@Module({
  providers: [CryptomusService],
  controllers: [CryptomusController]
})
export class CryptomusModule {}
