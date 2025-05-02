<?php
//controllers/UsuarioController.php

namespace UsuarioAutenticacao\Controllers;

use UsuarioAutenticacao\Services\UsuarioService;
use UsuarioAutenticacao\Core\HttpException;
use UsuarioAutenticacao\DTOS\CriarUsuarioDTO; 
use UsuarioAutenticacao\DTOS\LogarUsuarioDTO; 

class UsuarioController
{
    private UsuarioService $service;

    public function __construct()
    {
        $this->service = new UsuarioService();
    }


    public function cadastrar(array $dados): array
    {
        try {
            
            $dto = new CriarUsuarioDTO($dados);

            
            $resultado = $this->service->cadastrar($dto);

            
            return [
                'status' => 201,
                'data'   => $resultado,
            ];

        } catch (HttpException $e) {
            return [
                'status' => $e->getStatusCode(),
                'error'  => $e->toArray(),
            ];
        } catch (\Exception $e) {
            return [
                'status' => 500,
                'error'  => [
                    'statusCode' => 500,
                    'error'      => 'Erro interno do servidor',
                    'ErrorCode'  => '00',
                ],
            ];
        }
    }

    public function logar(array $dados): array
    {
        try {
            $dto = new LogarUsuarioDTO($dados);

            $resultado = $this->service->logar($dto);

            return [
                'status' => 200,
                'data'   => $resultado,
            ];

        } catch (HttpException $e) {
            return [
                'status' => $e->getStatusCode(),
                'error'  => $e->toArray(),
            ];
        } catch (\Exception $e) {
            return [
                'status' => 500,
                'error'  => [
                    'statusCode' => 500,
                    'error'      => 'Erro interno do servidor',
                    'ErrorCode'  => '00',
                ],
            ];
        }
    }

}
