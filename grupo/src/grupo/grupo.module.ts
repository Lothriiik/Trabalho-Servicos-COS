import { Module } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { GrupoController } from './grupo.controller';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  providers: [GrupoService, PrismaService],
  controllers: [GrupoController]
})
export class GrupoModule {}
