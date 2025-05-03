import {
    Controller,
    Post,
    Body,
    Request
} from '@nestjs/common';
import { CriarGrupoDTO } from './dto/criar-grupo.dto';
import { CriarGrupoDocs } from './grupo.swagger';
import { GrupoService } from './grupo.service';

@Controller('grupo')
export class GrupoController {
    constructor(private readonly grupoService: GrupoService){}

    @Post()
    @CriarGrupoDocs()
    async criarGrupo(
        @Body() criarGrupoDTO: CriarGrupoDTO,
        @Request() req,
    ): Promise<any> {
        criarGrupoDTO.usuario_uuid_fk = req.usuario_uuid;
        return await this.grupoService.criarGrupo(criarGrupoDTO);
    }

}
