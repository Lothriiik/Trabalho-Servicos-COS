//grupo\src\grupo\grupo.service.ts
import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { CriarGrupoDTO } from './grupo.dto';

@Injectable()
export class GrupoService {
    constructor(private prisma: PrismaService) {}

    async criarGrupo(criarGrupoDTO: CriarGrupoDTO): Promise<any> {

        const grupo =  await this.prisma.grupo.create({
            data: criarGrupoDTO,
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        return grupo;

    }

}
