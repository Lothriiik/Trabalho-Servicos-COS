<?php
//services/UsuarioService.php

namespace UsuarioAutenticacao\Services;

use UsuarioAutenticacao\DTOs\CriarUsuarioDTO;
use UsuarioAutenticacao\Core\HttpException;
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
}
