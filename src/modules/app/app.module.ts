import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configuration';
import { TokenModule } from '../token/token.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CryptomusModule } from '../cryptomus/cryptomus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TokenModule,
    AuthModule,
    UsersModule,
    CryptomusModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
