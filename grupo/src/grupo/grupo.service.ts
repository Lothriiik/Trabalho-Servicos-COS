//grupo\src\grupo\grupo.service.ts
import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { CriarGrupoDTO, EntrarGrupoDTO, ExcluirGrupoDTO, ObterGrupoDTO, SairGrupoDTO } from './grupo.dto';

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
    
      if (grupoExiste.usuario_uuid_fk === usuario_uuid_fk) {
        throw new HttpException(
          {
            statusCode: 403,
            error: 'Você já é o dono deste grupo',
            ErrorCode: '00',
          },
          HttpStatus.FORBIDDEN,
        );
      }
    
      await this.prisma.grupoUsuario.create({
        data: {
          grupo_uuid_fk,
          usuario_uuid_fk,
        },
      }).catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });
    
      return { message: 'Usuário adicionado ao grupo com sucesso.' };
    }
    

    async sairGrupo(sairGrupoDTO: SairGrupoDTO): Promise<any> {
      
      const { grupo_uuid_fk, usuario_uuid_fk } = sairGrupoDTO;

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
  
      await this.prisma.grupoUsuario.delete({
        where: {
          usuario_uuid_fk_grupo_uuid_fk: {
            usuario_uuid_fk,
            grupo_uuid_fk,
          },
        },
      }).catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });
      
  
      return { message: 'Usuário removido do grupo com sucesso.' };
    }

    async obterGrupo(obterGrupoDTO: ObterGrupoDTO): Promise<any> {
    
      const { grupo_uuid, usuario_uuid_fk } = obterGrupoDTO;

      try {
        const grupo = await this.prisma.grupo.findUnique({
          where: { grupo_uuid },
          select: {
            grupo_uuid: true,
            grupo_titulo: true,
            grupo_descricao: true,
          },
        });
    
        if (!grupo) {
          throw new HttpException(
            {
              statusCode: 404,
              error: 'Grupo não encontrado',
              ErrorCode: '00',
            },
            HttpStatus.NOT_FOUND,
          );
        }
    
        const usuarios = await this.prisma.grupoUsuario.findMany({
          where: { grupo_uuid_fk: grupo_uuid },
          select: { usuario_uuid_fk: true },
        });
    
        return {
          ...grupo,
          usuarios: usuarios.map((u) => u.usuario_uuid_fk),
        };
      } catch (e) {
        throw this.prisma.tratamentoErros(e);
      }
    }

    async obterGrupoDisponiveis(usuario_uuid: string): Promise<any> {
      try {
        const gruposUsuario = await this.prisma.grupoUsuario.findMany({
          where: { usuario_uuid_fk: usuario_uuid },
          select: { grupo_uuid_fk: true },
        });
    
        const gruposIgnorar = gruposUsuario.map((g) => g.grupo_uuid_fk);
    
        const grupos = await this.prisma.grupo.findMany({
          where: {
            NOT: {
              OR: [
                { usuario_uuid_fk: usuario_uuid },
                { grupo_uuid: { in: gruposIgnorar } },
              ],
            },
          },
          select: {
            grupo_uuid: true,
            grupo_titulo: true,
            grupo_descricao: true,
          },
        });
    
        return grupos;
      } catch (e) {
        throw new HttpException(
          {
            statusCode: 500,
            error: 'Erro ao buscar grupos',
            ErrorCode: '00',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    async obterGrupoMeu(usuario_uuid: string): Promise<any> {

      try {
        const grupos = await this.prisma.grupo.findMany({
          where: { usuario_uuid_fk: usuario_uuid },
          select: {
            grupo_uuid: true,
            grupo_titulo: true,
            grupo_descricao: true,
          },
        });
    
        return grupos;
      } catch (e) {
        throw new HttpException(
          {
            statusCode: 500,
            error: 'Erro ao buscar grupos',
            ErrorCode: '00',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

    }

    async obterGrupoInscrito(usuario_uuid: string): Promise<any> {

      try {
        const grupoUsuarios = await this.prisma.grupoUsuario.findMany({
          where: { usuario_uuid_fk: usuario_uuid },
          select: { grupo_uuid_fk: true },
        });
    
        const grupoUuids = grupoUsuarios.map((g) => g.grupo_uuid_fk);
    
        if (grupoUuids.length === 0) return [];
    
        const grupos = await this.prisma.grupo.findMany({
          where: { grupo_uuid: { in: grupoUuids } },
          select: {
            grupo_uuid: true,
            grupo_titulo: true,
            grupo_descricao: true,
          },
        });
    
        return grupos;
      } catch (e) {
        throw new HttpException(
          {
            statusCode: 500,
            error: 'Erro ao buscar grupos',
            ErrorCode: '00',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

    }
    
    
    
    

}
