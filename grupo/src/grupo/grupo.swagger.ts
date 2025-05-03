import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { Swagger400DTO, Swagger422DTO } from '../swagger/dto';


export class Response200 {
  @ApiProperty({
    example: '489122ab-f501-4bb4-be3e-277724ab2817',
    description: 'UUID do grupo gerado automaticamente',
    format: 'uuid',
  })
  grupo_uuid: string;

  @ApiProperty({
    example: 'Grupo de Estudos de IA',
    description: 'Título do grupo criado',
  })
  grupo_titulo: string;

  @ApiProperty({
    example: 'Grupo dedicado à discussão de temas de Inteligência Artificial.',
    description: 'Descrição do grupo criado',
  })
  grupo_descricao: string;

  @ApiProperty({
    example: '33ac67a0-14e9-459c-8bdd-3cf666cf4f83',
    description: 'UUID do usuário que criou o grupo',
    format: 'uuid',
  })
  usuario_uuid_fk: string;
}


export function CriarGrupoDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Realizar o cadastro de grupo' }),
    ApiResponse({
      status: 201,
      description: 'Grupo criado com sucesso',
      type: Response200,
    }),
    ApiResponse({
      status: 400,
      description: 'Solicitação malsucedida',
      type: Swagger400DTO,
    }),
    ApiResponse({
      status: 422,
      description: 'Conteúdo não processável',
      type: Swagger422DTO,
    }),
    ApiResponse({
      status: 401,
      description: 'Requisição sem autenticação',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno no servidor',
    })
  );
}
