//grupo\src\grupo\grupo.controller.ts
import {
    Controller,
    Post,
    Body,
    Request,
    Delete,
    Param,
    Get,
  } from '@nestjs/common';
  import { CriarGrupoDTO, EntrarGrupoDTO, ExcluirGrupoDTO, ObterGrupoDTO, SairGrupoDTO } from './grupo.dto';
  import { CriarGrupoDocs, ExcluirGrupoDocs, EntrarGrupoDocs, SairGrupoDocs, ObterGrupoDocs, ObterGruposDisponiveisDocs, ObterGruposMeuDocs, ObterGruposInscritoDocs } from './grupo.swagger';
  import { GrupoService } from './grupo.service';

@Controller('grupos')
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

    @Get(':grupo_uuid')
    @ObterGrupoDocs.Swagger()
    async obterGrupo(
        @Param() obterGrupoDTO: ObterGrupoDTO,
        @Request() req,
    ): Promise<any> {
        obterGrupoDTO.usuario_uuid_fk = req.usuario_uuid;
        return await this.grupoService.obterGrupo(obterGrupoDTO);
    }

    @Get('listar/disponiveis')
    @ObterGruposDisponiveisDocs.Swagger()
    async obterGrupoDisponiveis(
        @Request() req,
    ): Promise<any> {
        return await this.grupoService.obterGrupoDisponiveis(req.usuario_uuid);
    }

    @Get('listar/meu')
    @ObterGruposMeuDocs.Swagger()
    async obterGrupoMeu(
        @Request() req,
    ): Promise<any> {
        return await this.grupoService.obterGrupoMeu(req.usuario_uuid);
    }

    @Get('listar/inscrito')
    @ObterGruposInscritoDocs.Swagger()
    async obterGrupoInscrito(
        @Request() req,
    ): Promise<any> {
        return await this.grupoService.obterGrupoInscrito(req.usuario_uuid);
    }

    

}
