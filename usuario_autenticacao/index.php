<?php
//usuario_autenticacao\index.php

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require_once __DIR__ . '/migrations/create_usuario_table.php';

use UsuarioAutenticacao\Core\Router;
use UsuarioAutenticacao\Core\Swagger;
use UsuarioAutenticacao\Core\AuthMiddleware;

// Configuração do roteamento
header('Content-Type: application/json');

$router = new Router();
$authMiddleware = new AuthMiddleware($_ENV['JWT_SECRET']);

$router->get('/api/docs/openapi', 'SwaggerController', 'serveOpenApi');

$router->post('/usuario', 'UsuarioController', 'cadastrar', 'criar_usuario.swagger');
$router->post('/logar', 'UsuarioController', 'logar', 'logar_usuario.swagger');
$router->get('/usuario', 'UsuarioController', 'obter', 'obter_usuario.swagger', [$authMiddleware]);
$router->post('/usuarios', 'UsuarioController', 'listar', 'obter_usuarios.swagger', [$authMiddleware]);
$router->delete('/usuario', 'UsuarioController', 'apagar', 'apagar_usuario.swagger', [$authMiddleware]);

Swagger::setRouter($router);

$router->handleRequest();

?>