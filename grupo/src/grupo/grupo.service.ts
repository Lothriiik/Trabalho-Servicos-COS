//grupo\src\grupo\grupo.service.ts
import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { CriarGrupoDTO, ExcluirGrupoDTO } from './grupo.dto';

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

    async excluirGrupo(excluirGrupoDTO: ExcluirGrupoDTO): Promise<any> {

      const { grupo_uuid, usuario_uuid_fk } = excluirGrupoDTO;
    
      const grupo = await this.prisma.grupo.findFirst({
        where: {
          grupo_uuid,
          usuario_uuid_fk,
        },
      }).catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });
    
      if (!grupo) {
        throw new HttpException(
          {
            statusCode: 403,
            error: 'Grupo não encontrado ou você não tem permissão para excluí-lo',
            ErrorCode: '00',
          },
          HttpStatus.FORBIDDEN,
        );
      }
    
      await this.prisma.grupo.delete({
        where: { grupo_uuid },
      }).catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });
    
      return { message: 'Grupo excluído com sucesso.' };
    }
    
    

}
