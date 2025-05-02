<?php

namespace UsuarioAutenticacao\DTOs;

use UsuarioAutenticacao\Core\BaseDTO;

class ObterUsuarioDTO extends BaseDTO
{
    private string $usuario_uuid;
    private string $usuario_nome;
    private string $usuario_username;

    protected array $responseFields = [
        'usuario_uuid',
        'usuario_nome',
        'usuario_username'
    ];

    public function validar(array $dados): void
    {
        // Nenhuma validação necessária para este DTO
    }

    public function getUuid(): string
    {
        return $this->usuario_uuid;
    }

    public function getNome(): string
    {
        return $this->usuario_nome;
    }

    public function getUsername(): string
    {
        return $this->usuario_username;
    }
} 