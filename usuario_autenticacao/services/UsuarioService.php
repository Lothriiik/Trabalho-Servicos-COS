<?php
//services/UsuarioService.php

namespace UsuarioAutenticacao\Services;

use UsuarioAutenticacao\dtos\CriarUsuarioDTO;
use UsuarioAutenticacao\dtos\LogarUsuarioDTO;
use UsuarioAutenticacao\dtos\ObterUsuarioDTO;
use UsuarioAutenticacao\dtos\ObterUsuariosDTO;
use UsuarioAutenticacao\core\HttpException;
use UsuarioAutenticacao\core\JWT;
use UsuarioAutenticacao\daos\UsuarioDAO;

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

    public function obter($usuario_uuid): array
    {
        try {
     
            $usuario = $this->usuarioDAO->usuarioPorUuid($usuario_uuid);

            if (!$usuario) {
                throw new HttpException(
                    'Usuário não encontrado',
                    404,
                    'NOT_FOUND'
                );
            }

            $dto = new ObterUsuarioDTO([
                'usuario_uuid' => $usuario['usuario_uuid'],
                'usuario_nome' => $usuario['usuario_nome'],
                'usuario_username' => $usuario['usuario_username'],
            ]);

            return $dto->toArrayResponse();
        } catch (\Exception $e) {
            if ($e instanceof HttpException) {
                throw $e;
            }
        }
    }

     public function listar(array $usuarioIds): array
        {
            try {
                return $this->usuarioDAO->usuariosPorUuids($usuarioIds);
            } catch (HttpException $e) {
                throw $e;
            } catch (\Exception $e) {
                throw new HttpException(
                    'Erro interno ao listar usuários',
                    500,
                    'SERVER_ERROR',
                    '00'
                );
            }
        }

        public function apagar(string $usuario_uuid): void
        {
            $usuario = $this->usuarioDAO->usuarioPorUuid($usuario_uuid);
        
            if (!$usuario) {
                throw new HttpException('Usuário não encontrado', 404, 'USUARIO', '00');
            }
        
            $this->usuarioDAO->apagarPorUuid($usuario_uuid);
        }


}
