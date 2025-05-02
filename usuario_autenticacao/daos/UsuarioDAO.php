<?php
//usuario_autenticacao/daos/UsuarioDAO.php

namespace UsuarioAutenticacao\DAOs;

use UsuarioAutenticacao\Core\InstanceDAO;
use UsuarioAutenticacao\Core\HttpException;
use PDOException;

class UsuarioDAO {
    private $db;

    public function __construct() {
        $this->db = InstanceDAO::getInstance();
    }

    public function verificarUsernameExistente(string $username): bool {
        $stmt = $this->db->getConnection()
                       ->prepare('SELECT COUNT(*) FROM usuario WHERE usuario_username = ?');
        $stmt->execute([$username]);
        return $stmt->fetchColumn() > 0;
    }

    public function usuarioPorUsername(string $username): ?array {
        $stmt = $this->db->getConnection()
                       ->prepare('
                           SELECT usuario_uuid, usuario_nome, usuario_username, usuario_senha 
                           FROM usuario 
                           WHERE usuario_username = ?
                       ');
        $stmt->execute([$username]);
        $resultado = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $resultado ?: null;
    }

    public function usuarioPorUuid(string $uuid): ?array {
        $stmt = $this->db->getConnection()
                       ->prepare('
                           SELECT usuario_uuid, usuario_nome, usuario_username 
                           FROM usuario 
                           WHERE usuario_uuid = ?
                       ');
        $stmt->execute([$uuid]);
        $resultado = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $resultado ?: null;
    }

    public function inserir(array $dados): void {
        $insert = $this->db->getConnection()
            ->prepare('
                INSERT INTO usuario
                    (usuario_uuid, usuario_nome, usuario_username, usuario_senha)
                VALUES (?, ?, ?, ?)
            ');

        try {
            $insert->execute($dados);
        } catch (PDOException $e) {
            throw new HttpException('Erro ao cadastrar usuário', 500, 'DB_ERROR');
        }
    }
} 