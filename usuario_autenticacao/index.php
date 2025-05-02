<?php
//usuario_autenticacao\index.php

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require_once __DIR__ . '/migrations/create_usuario_table.php';

use UsuarioAutenticacao\Core\Router;
use UsuarioAutenticacao\Core\Swagger;

// Configuração do roteamento
header('Content-Type: application/json');

$router = new Router();

$router->get('/api/docs/openapi', 'SwaggerController', 'serveOpenApi');

$router->post('/usuario', 'UsuarioController', 'cadastrar', 'criar_usuario.swagger');

Swagger::setRouter($router);

$router->handleRequest();

?>