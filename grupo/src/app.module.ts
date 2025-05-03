import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AutenticacaoModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}