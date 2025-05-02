<?php
namespace UsuarioAutenticacao\DTOs;

use UsuarioAutenticacao\Core\BaseDTO;
use UsuarioAutenticacao\Core\HttpException;

class ObterUsuariosDTO extends BaseDTO
{

    private array  $usuario_ids;

    protected array $requestFields = [
        'usuario_ids',
    ];

    public function validar(array $dados): void
    {
        if (!isset($dados['usuario_ids']) || !is_array($dados['usuario_ids']) || empty($dados['usuario_ids'])) {
            throw new HttpException(
                'Lista de usuario_ids é obrigatória',
                400,
                'VALIDATION',
                '01'
            );
        }

        foreach ($dados['usuario_ids'] as $id) {
            if (!is_string($id) || trim($id) === '') {
                throw new HttpException(
                    'Cada usuario_id deve ser uma string válida',
                    400,
                    'VALIDATION',
                    '01'
                );
            }
        }
    }

    public function getUsuarioIds(): array
    {
        return $this->usuario_ids;
    }
}
