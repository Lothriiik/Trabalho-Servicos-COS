<?php
//controllers/SwaggerController.php

namespace UsuarioAutenticacao\Controllers;

use UsuarioAutenticacao\Core\Swagger;

class SwaggerController
{
    public function serveOpenApi(): array
    {
        // Gera o arquivo openapi.yaml
        if (!Swagger::generateOpenApiYaml()) {
            return [
                'status' => 500,
                'error' => [
                    'statusCode' => 500,
                    'error' => 'Erro ao gerar a documentação Swagger',
                    'errorCode' => '00'
                ]
            ];
        }

        // Lê o arquivo gerado
        $yamlFile = __DIR__ . '/../docs/openapi.yaml';
        if (!file_exists($yamlFile)) {
            return [
                'status' => 500,
                'error' => [
                    'statusCode' => 500,
                    'error' => 'Arquivo de documentação não encontrado',
                    'errorCode' => '00'
                ]
            ];
        }

        $content = file_get_contents($yamlFile);
        if ($content === false) {
            return [
                'status' => 500,
                'error' => [
                    'statusCode' => 500,
                    'error' => 'Erro ao ler o arquivo de documentação',
                    'errorCode' => '00'
                ]
            ];
        }

        // Retorna o conteúdo YAML
        return [
            'status' => 200,
            'data' => $content
        ];
    }
}
