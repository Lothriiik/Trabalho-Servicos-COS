<?php
//usuario_autenticacao/core/Swagger.php

namespace UsuarioAutenticacao\Core;

use Symfony\Component\Yaml\Yaml;

class Swagger
{
    private static $router;

    public static function setRouter(Router $router)
    {
        self::$router = $router;
    }
    

    public static function generateOpenApiYaml()
    {
        $base = [
            'openapi' => '3.0.0',
            'info' => [
                'title' => 'API de Autenticação de Usuários',
                'description' => 'API para gerenciamento de usuários e autenticação',
                'version' => '1.0.0',
            ],
            'servers' => [
                [
                    'url' => 'http://localhost:1410',
                    'description' => 'Servidor local',
                ],
            ],
            'components' => [
                'securitySchemes' => [
                    'BearerAuth' => [
                        'type' => 'http',
                        'scheme' => 'bearer',
                        'bearerFormat' => 'JWT',
                    ],
                ],
                'schemas' => [
                    'Error' => [
                        'type' => 'object',
                        'properties' => [
                            'statusCode' => ['type' => 'integer'],
                            'error' => ['type' => 'string'],
                            'errorCode' => ['type' => 'string'],
                        ],
                    ],
                ],
            ],
            'paths' => [],
        ];

        foreach (self::$router->getSwaggerFiles() as $swaggerFile) {
            $filePath = __DIR__ . '/../swaggers/' . $swaggerFile;
            if (!is_file($filePath)) {
                error_log("[Swagger] Arquivo não encontrado: $filePath");
                continue;
            }

            $yamlFragment = file_get_contents($filePath);
            if ($yamlFragment === false) {
                error_log("[Swagger] Falha ao ler o arquivo: $filePath");
                continue;
            }

            try {
                $parsed = Yaml::parse($yamlFragment);
                if (!is_array($parsed)) continue;

                foreach ($parsed as $path => $methods) {
                    if (!isset($base['paths'][$path])) {
                        $base['paths'][$path] = [];
                    }
                    foreach ($methods as $method => $details) {
                        $base['paths'][$path][$method] = $details;
                    }
                }
            } catch (\Exception $e) {
                error_log("[Swagger] Erro ao parsear YAML em $filePath: " . $e->getMessage());
            }
        }

        $yamlOutput = Yaml::dump($base, 20, 2); // profundidade e indentação
        $outputFile = __DIR__ . '/../docs/openapi.yaml';

        if (file_put_contents($outputFile, $yamlOutput) === false) {
            error_log("[Swagger] Erro ao gravar em: $outputFile");
            return false;
        }

        return true;
    }
}
