<?php

namespace UsuarioAutenticacao\core;

use UsuarioAutenticacao\core\HttpException;
use UsuarioAutenticacao\core\JWT;

class AuthMiddleware
{
    private string $jwtSecret;

    public function __construct(string $jwtSecret)
    {
        $this->jwtSecret = $jwtSecret;
    }

    public function handle(array $params): array
    {

        $token = $_SERVER['HTTP_AUTHORIZATION'] ?? null;

        if (!$token && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
            $token = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
        }

        if (!$token) {
            throw new HttpException('Token não fornecido', 401, 'AUTHENTICATION', '01');
        }

        $token = str_replace('Bearer ', '', $token);
        $payload = JWT::decode($token, $this->jwtSecret);

        error_log("UUID do payload: " . ($payload['sub'] ?? 'não definido'));

        if (!isset($payload['sub'])) {
            throw new HttpException('Token inválido ou expirado', 401, 'AUTHENTICATION', '02');
        }

        // Extrai input (último item se for array)
        if (!empty($params)) {
            $last = end($params);
            if (is_array($last)) {
                $input = array_pop($params); 
                $input['usuario_uuid'] = $payload['sub']; 
                $params[] = $input;
            }
        }

        error_log("Adicionando UUID aos parâmetros: " . json_encode($params));

        return $params;
    }
}
