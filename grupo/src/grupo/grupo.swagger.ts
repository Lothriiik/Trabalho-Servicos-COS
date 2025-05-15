//grupo\src\grupo\grupo.swagger.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { Swagger400DTO, Swagger422DTO } from '../swagger/dto';

export namespace CriarGrupoDocs {
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

  export function Swagger() {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary: 'Realizar o cadastro de grupo' }),
      ApiResponse({
        status: 201,
        description: 'Grupo criado com sucesso',
        type: CriarGrupoDocs.Response200,
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
}

export namespace ExcluirGrupoDocs {
  export function Swagger() {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary: 'Excluir um grupo existente' }),
      ApiResponse({
        status: 200,
        description: 'Grupo excluído com sucesso',
        schema: { example: { message: 'Grupo excluído com sucesso.' } },
      }),
      ApiResponse({
        status: 403,
        description: 'Você não tem permissão para excluir este grupo',
        schema: {
          example: {
            statusCode: 403,
            error: 'Você não tem permissão para excluir este grupo',
            ErrorCode: '00',
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Grupo não encontrado',
        schema: {
          example: {
            statusCode: 404,
            error: 'Grupo não encontrado',
            ErrorCode: '00',
          },
        },
      }),
      ApiResponse({ status: 401, description: 'Requisição sem autenticação' }),
      ApiResponse({ status: 500, description: 'Erro interno no servidor' }),
    );
  }
}

export namespace EntrarGrupoDocs {
  export function Swagger() {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary: 'Entrar em um grupo existente' }),
      ApiResponse({
        status: 201,
        description: 'Usuário adicionado ao grupo com sucesso',
        schema: {
          example: {
            message: 'Usuário adicionado ao grupo com sucesso.',
          },
        },
      }),
      ApiResponse({
        status: 403,
        description: 'Usuário já participa deste grupo',
        schema: {
          example: {
            statusCode: 403,
            error: 'Usuário já participa deste grupo',
            ErrorCode: '00',
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Grupo não encontrado',
        schema: {
          example: {
            statusCode: 404,
            error: 'Grupo não encontrado',
            ErrorCode: '00',
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Requisição sem autenticação',
      }),
      ApiResponse({
        status: 500,
        description: 'Erro interno no servidor',
      }),
    );
  }
}

export namespace SairGrupoDocs {
  export function Swagger() {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary: 'Sair de um grupo existente' }),
      ApiResponse({
        status: 200,
        description: 'Usuário removido do grupo com sucesso',
        schema: {
          example: {
            message: 'Usuário removido do grupo com sucesso.',
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Relação do usuário com o grupo não encontrada',
        schema: {
          example: {
            statusCode: 404,
            error: 'Usuário não está neste grupo',
            ErrorCode: '00',
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Requisição sem autenticação',
      }),
      ApiResponse({
        status: 500,
        description: 'Erro interno no servidor',
      }),
    );
  }
}

export namespace ObterGrupoDocs {
  export class Response200 {
    @ApiProperty({
      example: '5496b16e-df27-4847-adc7-5e00998379c6',
      description: 'UUID do grupo',
      format: 'uuid',
    })
    grupo_uuid: string;

    @ApiProperty({
      example: 'Grupo de Estudos de IA',
      description: 'Título do grupo',
    })
    grupo_titulo: string;

    @ApiProperty({
      example: 'Grupo dedicado à discussão de temas de Inteligência Artificial.',
      description: 'Descrição do grupo',
    })
    grupo_descricao: string;

    @ApiProperty({
      example: [
        '123e4567-e89b-12d3-a456-426614174000',
        '987e4567-e89b-12d3-a456-426614174506',
      ],
      description: 'Lista de usuários associados ao grupo (UUIDs)',
      type: [String],
    })
    usuarios: string[];
  }

  export function Swagger() {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary: 'Obter dados de um grupo específico' }),
      ApiResponse({
        status: 200,
        description: 'Grupo retornado com sucesso',
        //type: Response200,
        schema: {
          example: {
            grupo_uuid: '5496b16e-df27-4847-adc7-5e00998379c6',
            grupo_titulo: 'Grupo de Estudos de IA',
            grupo_descricao: 'Grupo dedicado à discussão de temas de Inteligência Artificial.',
            usuarios: [
              '123e4567-e89b-12d3-a456-426614174000',
              '987e4567-e89b-12d3-a456-426614174506',
            ],
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Grupo não encontrado',
        schema: {
          example: {
            statusCode: 404,
            error: 'Grupo não encontrado',
            ErrorCode: '00',
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Requisição sem autenticação',
      }),
      ApiResponse({
        status: 500,
        description: 'Erro interno no servidor',
      }),
    );
  }
}


export namespace ObterGruposDisponiveisDocs {
  export class Response200 {
    @ApiProperty({
      example: 'c8243e8e-9d5d-4b20-8dc1-20b4568d7c26',
      description: 'UUID do grupo',
      format: 'uuid',
    })
    grupo_uuid: string;

    @ApiProperty({
      example: 'Grupo de Estudos de IA',
      description: 'Título do grupo',
    })
    grupo_titulo: string;

    @ApiProperty({
      example: 'Discussões sobre Inteligência Artificial.',
      description: 'Descrição do grupo',
    })
    grupo_descricao: string;
  }

  export function Swagger() {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary: 'Listar todos os grupos disponíveis para o usuário',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista de grupos retornada com sucesso',
        type: Response200,
        isArray: true,
      }),
      ApiResponse({
        status: 401,
        description: 'Requisição sem autenticação',
      }),
      ApiResponse({
        status: 500,
        description: 'Erro ao buscar grupos',
        schema: {
          example: {
            statusCode: 500,
            error: 'Erro ao buscar grupos',
            ErrorCode: '00',
          },
        },
      }),
    );
  }
}

export namespace ObterGruposMeuDocs {
  export class Response200 {
    @ApiProperty({
      example: 'c8243e8e-9d5d-4b20-8dc1-20b4568d7c26',
      description: 'UUID do grupo',
      format: 'uuid',
    })
    grupo_uuid: string;

    @ApiProperty({
      example: 'Grupo de Estudos de IA',
      description: 'Título do grupo',
    })
    grupo_titulo: string;

    @ApiProperty({
      example: 'Discussões sobre Inteligência Artificial.',
      description: 'Descrição do grupo',
    })
    grupo_descricao: string;
  }

  export function Swagger() {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary: 'Listar os grupos criados pelo usuário',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista de grupos retornada com sucesso',
        type: Response200,
        isArray: true,
      }),
      ApiResponse({
        status: 401,
        description: 'Requisição sem autenticação',
      }),
      ApiResponse({
        status: 500,
        description: 'Erro ao buscar grupos',
        schema: {
          example: {
            statusCode: 500,
            error: 'Erro ao buscar grupos',
            ErrorCode: '00',
          },
        },
      }),
    );
  }
}

export namespace ObterGruposInscritoDocs {
  export class Response200 {
    @ApiProperty({
      example: 'c8243e8e-9d5d-4b20-8dc1-20b4568d7c26',
      description: 'UUID do grupo',
      format: 'uuid',
    })
    grupo_uuid: string;

    @ApiProperty({
      example: 'Grupo de Estudos de IA',
      description: 'Título do grupo',
    })
    grupo_titulo: string;

    @ApiProperty({
      example: 'Discussões sobre Inteligência Artificial.',
      description: 'Descrição do grupo',
    })
    grupo_descricao: string;
  }

  export function Swagger() {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary: 'Listar os grupos que o usuário participa',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista de grupos retornada com sucesso',
        type: Response200,
        isArray: true,
      }),
      ApiResponse({
        status: 401,
        description: 'Requisição sem autenticação',
      }),
      ApiResponse({
        status: 500,
        description: 'Erro ao buscar grupos',
        schema: {
          example: {
            statusCode: 500,
            error: 'Erro ao buscar grupos',
            ErrorCode: '00',
          },
        },
      }),
    );
  }
}




