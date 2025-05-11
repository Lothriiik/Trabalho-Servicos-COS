<?php
//usuario_autenticacao\index.php

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require_once __DIR__ . '/migrations/create_usuario_table.php';

use UsuarioAutenticacao\core\Router;
use UsuarioAutenticacao\core\Swagger;
use UsuarioAutenticacao\core\AuthMiddleware;
use UsuarioAutenticacao\core\CorsMiddleware;

// Configuração do roteamento
header('Content-Type: application/json');

$router = new Router('/usuario');
$authMiddleware = new AuthMiddleware($_ENV['JWT_SECRET']);

$router->get('/openapi', 'SwaggerController', 'serveOpenApi');

$router->post('/', 'UsuarioController', 'cadastrar', 'criar_usuario.swagger');
$router->post('/logar', 'UsuarioController', 'logar', 'logar_usuario.swagger');
$router->get('/', 'UsuarioController', 'obter', 'obter_usuario.swagger', [$authMiddleware]);
$router->post('/usuarios/listar', 'UsuarioController', 'listar', 'obter_usuarios.swagger', [$authMiddleware]);
$router->delete('/', 'UsuarioController', 'apagar', 'apagar_usuario.swagger', [$authMiddleware]);

Swagger::setRouter($router);
CorsMiddleware::handle();

$router->handleRequest();

?>