<?php
//services/UsuarioService.php

namespace UsuarioAutenticacao\Services;

use UsuarioAutenticacao\DTOs\CriarUsuarioDTO;
use UsuarioAutenticacao\DTOs\LogarUsuarioDTO;
use UsuarioAutenticacao\Core\HttpException;
use UsuarioAutenticacao\Core\JWT;
use UsuarioAutenticacao\DAOs\UsuarioDAO;

class UsuarioService
{
    private $usuarioDAO;

    public function __construct()
    {
        $this->usuarioDAO = new UsuarioDAO();
    }

    public function cadastrar(CriarUsuarioDTO $dto): array
    {
        if ($this->usuarioDAO->verificarUsernameExistente($dto->getUsername())) {
            throw new HttpException('Username já está em uso', 409, '00');
        }

        $dto->setUuid();
        $dto->setPasswordHash();

        $this->usuarioDAO->inserir(array_values($dto->toArrayDB()));

        return $dto->toArrayResponse();
    }

    public function logar(LogarUsuarioDTO $dto): array
    {
        $usuario = $this->usuarioDAO->usuarioPorUsername($dto->getUsername());

        if (!$usuario) {
            throw new HttpException(
                'Credenciais inválidas',
                401,
                'AUTHENTICATION',
                '01'
            );
        }

        if (!password_verify($dto->getSenha(), $usuario['usuario_senha'])) {
            throw new HttpException(
                'Credenciais inválidas',
                401,
                'AUTHENTICATION',
                '01'
            );
        }

        $jwt_secret = $_ENV['JWT_SECRET'];
        $jwt_expiration = (int) ($_ENV['JWT_EXPIRATION']);

        $payload = [
            'usuario_uuid' => $usuario['usuario_uuid'],
            'usuario_username' => $usuario['usuario_username'],
            'exp' => time() + $jwt_expiration
        ];

        $dto->setAccess_token(JWT::encode($payload, $jwt_secret));

        return $dto->toArrayResponse();
        
    }

}
