<?php
//usuario_autenticacao\index.php

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require_once __DIR__ . '/migrations/create_usuario_table.php';

?>