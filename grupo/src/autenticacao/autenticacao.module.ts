//grupo\src\grupo\autenticacao.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './autenticacao.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s'},
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [],
})
export class AutenticacaoModule {}
