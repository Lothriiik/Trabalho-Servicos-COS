//grupo\src\grupo\grupo.controller.ts
import {
    Controller,
    Post,
    Body,
    Request,
    Delete,
    Param,
  } from '@nestjs/common';
  import { CriarGrupoDTO, ExcluirGrupoDTO } from './grupo.dto';
  import { CriarGrupoDocs, ExcluirGrupoDocs } from './grupo.swagger';
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

}
