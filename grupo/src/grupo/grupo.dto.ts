//grupo\src\grupo\grupo.dto.ts
import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CriarGrupoDTO {

    @ApiProperty({
      example: 'Grupo de Estudos de IA',
      description: 'Título do grupo a ser criado',
    })
    @IsNotEmpty({ message: 'O campo $property não pode estar vazio.' })
    @IsString({ message: 'O campo $property deve ser uma string válida.' })
    grupo_titulo: string;
  
    @ApiProperty({
      example: 'Grupo dedicado à discussão de temas de Inteligência Artificial.',
      description: 'Descrição do grupo',
    })
    @IsNotEmpty({ message: 'O campo $property não pode estar vazio.' })
    @IsString({ message: 'O campo $property deve ser uma string válida.' })
    grupo_descricao: string;
  
    usuario_uuid_fk: string;
}
