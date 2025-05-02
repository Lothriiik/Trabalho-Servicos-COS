<?php
//migrations/create_usuario_table.php

use UsuarioAutenticacao\Core\InstanceDAO;

$db = InstanceDAO::getInstance();

// SQL para criar a tabela usuario
$sql = <<<'SQL'
CREATE TABLE IF NOT EXISTS usuario (
    usuario_uuid   TEXT PRIMARY KEY,
    usuario_nome   TEXT NOT NULL,
    usuario_username TEXT NOT NULL UNIQUE,
    usuario_senha  TEXT NOT NULL
);
SQL;

// Executa o SQL usando a classe InstanceDAO via autoload
$db->execute($sql);
