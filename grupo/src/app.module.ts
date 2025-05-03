import { Module } from '@nestjs/common';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { PrismaModule } from './prisma/prisma.module';
import { GrupoModule } from './grupo/grupo.module';

@Module({
  imports: [AutenticacaoModule, PrismaModule, GrupoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}