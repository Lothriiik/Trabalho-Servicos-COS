<?php
//usuario_autenticacao/daos/UsuarioDAO.php

namespace UsuarioAutenticacao\daos;

use UsuarioAutenticacao\core\InstanceDAO;
use UsuarioAutenticacao\core\HttpException;
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

    public function usuariosPorUuids(array $uuids): array
    {
        try {
            $placeholders = implode(',', array_fill(0, count($uuids), '?'));
            $sql = "
                SELECT
                    usuario_uuid,
                    usuario_nome,
                    usuario_username
                FROM usuario
                WHERE usuario_uuid IN ($placeholders)
            ";
            $stmt = $this->db->getConnection()->prepare($sql);
            $stmt->execute($uuids);

            $resultado = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $resultado ?: [];
        } catch (PDOException $e) {
            throw new HttpException( 'Falha na consulta de usuários', 500, 'DB_ERROR');
        }
    }

    public function apagarPorUuid(string $uuid): void
    {
        $stmt = $this->db->getConnection()->prepare('DELETE FROM usuario WHERE usuario_uuid = ?');
        $stmt->execute([$uuid]);
    }

} 