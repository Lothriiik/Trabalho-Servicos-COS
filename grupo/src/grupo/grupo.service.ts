//grupo\src\grupo\grupo.service.ts
import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { CriarGrupoDTO, EntrarGrupoDTO, ExcluirGrupoDTO } from './grupo.dto';

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
    
    async entrarGrupo(entrarGrupoDTO: EntrarGrupoDTO): Promise<any> {
      
      const { grupo_uuid_fk, usuario_uuid_fk } = entrarGrupoDTO;

      const grupoExiste = await this.prisma.grupo.findUnique({
        where: { grupo_uuid: grupo_uuid_fk },
      }).catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });
  
      if (!grupoExiste) {
        throw new HttpException(
          {
            statusCode: 404,
            error: 'Grupo não encontrado',
            ErrorCode: '00',
          },
          HttpStatus.NOT_FOUND,
        );
      }
  
      await this.prisma.grupoUsuario.create({
        data: {
          grupo_uuid_fk: grupo_uuid_fk,
          usuario_uuid_fk: usuario_uuid_fk,
        },
      }).catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });
  
      return { message: 'Usuário adicionado ao grupo com sucesso.' };
    }
    

}
