//grupo\src\grupo\grupo.controller.ts
import {
    Controller,
    Post,
    Body,
    Request,
    Delete,
    Param,
  } from '@nestjs/common';
  import { CriarGrupoDTO, EntrarGrupoDTO, ExcluirGrupoDTO, SairGrupoDTO } from './grupo.dto';
  import { CriarGrupoDocs, ExcluirGrupoDocs, EntrarGrupoDocs, SairGrupoDocs } from './grupo.swagger';
  import { GrupoService } from './grupo.service';

@Controller('grupo')
export class GrupoController {
    constructor(private readonly grupoService: GrupoService){}

    @Post()
    @CriarGrupoDocs.Swagger()
    async criarGrupo(
        @Body() criarGrupoDTO: CriarGrupoDTO,
        @Request() req,
    ): Promise<any> {
        criarGrupoDTO.usuario_uuid_fk = req.usuario_uuid;
        return await this.grupoService.criarGrupo(criarGrupoDTO);
    }

    @Delete(':grupo_uuid')
    @ExcluirGrupoDocs.Swagger()
    async deletarGrupo(
        @Param() excluirGrupoDTO: ExcluirGrupoDTO,
        @Request() req,
    ): Promise<any> {
        excluirGrupoDTO.usuario_uuid_fk = req.usuario_uuid;
        return await this.grupoService.excluirGrupo(excluirGrupoDTO);
    }

    @Post('entrar/:grupo_uuid')
    @EntrarGrupoDocs.Swagger()
    async entrarGrupo(
        @Body() entrarGrupoDTO: EntrarGrupoDTO,
        @Request() req,
    ): Promise<any> {
        entrarGrupoDTO.usuario_uuid_fk = req.usuario_uuid;
        return await this.grupoService.entrarGrupo(entrarGrupoDTO);
    }

    @Delete('sair/:grupo_uuid')
    @SairGrupoDocs.Swagger()
    async sairGrupo(
        @Body() sairGrupoDTO: SairGrupoDTO,
        @Request() req,
    ): Promise<any> {
        sairGrupoDTO.usuario_uuid_fk = req.usuario_uuid;
        return await this.grupoService.sairGrupo(sairGrupoDTO);
    }

    

}
