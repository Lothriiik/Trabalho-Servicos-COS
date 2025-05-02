<?php

namespace UsuarioAutenticacao\DTOs;

use UsuarioAutenticacao\Core\BaseDTO;
use UsuarioAutenticacao\Core\HttpException;
use UsuarioAutenticacao\Core\Validator;

class LogarUsuarioDTO extends BaseDTO
{
    private string $usuario_username;
    private string $usuario_senha;
    private string $access_token;

    protected array $dbFields = [];

    protected array $responseFields = [
        'access_token'
    ];

    protected function validar(array $dados): void
    {
        $validator = Validator::getInstance();
        $rules = [
            'usuario_username' => ['required', 'string', 'alnum', 'no_whitespace', 'min:3', 'max:50'],
            'usuario_senha' => ['required', 'string', 'min:6']
        ];

        if (!$validator->validate($dados, $rules)) {
            throw new HttpException(
                $validator->getFirstError(),
                400,
                'VALIDATION'
            );
        }
    }

    public function getUsername(): string
    {
        return $this->usuario_username;
    }

    public function getSenha(): string
    {
        return $this->usuario_senha;
    }

    public function setAccess_token(string $access_token): void
    {
        $this->access_token = $access_token;
    }
} 