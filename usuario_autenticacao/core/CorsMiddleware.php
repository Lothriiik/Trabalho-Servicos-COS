<?php
//usuario_autenticacao\core\CorsMiddleware.php

namespace UsuarioAutenticacao\core;

class CorsMiddleware
{
    public static function handle() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit();
        }
    }
}