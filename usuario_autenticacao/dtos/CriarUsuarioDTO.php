<?php
//dtos/CriarUsuarioDTO.php

namespace UsuarioAutenticacao\dtos;

use UsuarioAutenticacao\core\BaseDTO;
use UsuarioAutenticacao\core\HttpException;
use UsuarioAutenticacao\core\Validator;
use UsuarioAutenticacao\core\UUID;

class CriarUsuarioDTO extends BaseDTO
{
    private string $usuario_uuid;
    private string $usuario_nome;
    private string $usuario_username;
    private string $usuario_senha;

    protected array $dbFields = [
        'usuario_uuid',
        'usuario_nome',
        'usuario_username',
        'usuario_senha'
    ];

    protected array $responseFields = [
        'usuario_uuid',
        'usuario_nome',
        'usuario_username'
    ];

    protected function validar(array $dados): void
    {
        $validator = Validator::getInstance();
        $rules = [
            'usuario_nome' => ['required', 'string', 'min:3', 'max:255'],
            'usuario_username' => ['required', 'string', 'alnum', 'no_whitespace', 'min:3', 'max:50'],
            'usuario_senha' => ['required', 'string', 'min:6']
        ];

        if (!$validator->validate($dados, $rules)) {
            throw new HttpException(
                $validator->getFirstError(),
                400,
                00
            );
        }
    }

    public function setUuid(): void
    {
        $this->usuario_uuid = UUID::generate();
    }

    public function setPasswordHash(): void
    {
        $this->usuario_senha = password_hash($this->usuario_senha, PASSWORD_DEFAULT);
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

    public function getSenha(): string
    {
        return $this->usuario_senha;
    }

    public function setSenha(string $senha): void
    {
        $this->usuario_senha = $senha;
    }
}
