<?php
// core/InstanceDAO.php

namespace UsuarioAutenticacao\Core;

use PDO;
use PDOException;

class InstanceDAO {
    private static ?self $instance = null;
    private PDO $pdo;

    private function __construct() {
        $dbPath = $_ENV['DB_PATH'] ?? './data/usuario.sqlite';

        if (!is_dir(dirname($dbPath))) {
            mkdir(dirname($dbPath), 0777, true);
        }

        try {
            $this->pdo = new PDO('sqlite:' . $dbPath);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            die('Erro ao conectar ao banco de dados: ' . $e->getMessage());
        }
    }

    public static function getInstance(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection(): PDO {
        return $this->pdo;
    }

    public function execute(string $sql): int {
        try {
            return $this->pdo->exec($sql);
        } catch (PDOException $e) {
            die('Erro ao executar SQL: ' . $e->getMessage());
        }
    }
}
