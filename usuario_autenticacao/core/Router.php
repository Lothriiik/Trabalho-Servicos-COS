<?php
//usuario_autenticacao/core/Router.php

namespace UsuarioAutenticacao\Core;

class Router {
    private $routes = [];
    private $basePath = '';
    private $swaggerFiles = [];
    private $middlewares = [];

    public function __construct($basePath = '') {
        $this->basePath = $basePath;
    }

    public function handleRequest() {
        try {

            $method = $_SERVER['REQUEST_METHOD'];
            $uri    = $_SERVER['REQUEST_URI'];

            error_log("Processando requisição: Method=$method, URI=$uri");

            $route = $this->match($method, $uri);
            error_log("Rota encontrada: " . json_encode($route));

            $controllerClass = "UsuarioAutenticacao\\Controllers\\{$route['controller']}";
            if (!class_exists($controllerClass)) {
                throw new HttpException("Controller {$route['controller']} não encontrado", 500, '00');
            }

            $controller = new $controllerClass();

            $input  = $this->getInput($method);
            $params = array_merge($route['params'], [$input]);
            error_log("Parâmetros para o controller: " . json_encode($params));

            // Executa os middlewares da rota
            foreach ($route['middlewares'] as $middleware) {
                if (is_object($middleware) && method_exists($middleware, 'handle')) {
                    error_log("Executando middleware: " . get_class($middleware));
                    $params = $middleware->handle($params);
                } else {
                    error_log("Middleware inválido ou ausente.");
                }
            }

            error_log("Parâmetros para o controller: " . json_encode($params));


            if (!method_exists($controller, $route['action'])) {
                throw new HttpException("Método {$route['action']} não existe no controller {$route['controller']}", 500, '00');
            }

            $response = call_user_func_array([$controller, $route['action']], $params);
            error_log("Resposta do controller: " . json_encode($response));

            $this->sendResponse($response);

        } catch (HttpException $e) {
            error_log("Erro HTTP: " . $e->getMessage());
            $this->sendError($e);
        } catch (\Exception $e) {
            error_log("Erro inesperado: " . $e->getMessage());
            $this->sendError($e, true);
        }
    }

    private function getInput(string $method): array {
        if ($method === 'POST' || $method === 'PUT') {
            $rawInput = file_get_contents('php://input');
            error_log("Input recebido: " . $rawInput);
    
            $input = json_decode($rawInput, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new HttpException('JSON inválido: ' . json_last_error_msg(), 400, '00');
            }
            return $input;
        }
    
        if ($method === 'GET' || $method === 'DELETE') {
            return $_GET;
        }
    
        return [];
    }
    

    private function sendResponse($response) {
        http_response_code($response['status']);

        // Se for a rota de documentação, envia como YAML
        if (strpos($_SERVER['REQUEST_URI'], '/api/docs/openapi') !== false) {
            header('Content-Type: application/yaml');
            echo $response['data'];
            return;
        }

        // Para outras rotas, envia como JSON
        echo json_encode($response['data'] ?? $response['error']);
    }

    private function sendError($e, $isInternal = false) {
        if ($isInternal) {
            http_response_code(500);
            echo json_encode([
                'statusCode' => 500,
                'error'      => 'Erro interno do servidor',
                'errorCode'  => '00',
                'details'    => $e->getMessage()
            ]);
        } else {
            http_response_code($e->getStatusCode());
            echo json_encode($e->toArray());
        }
    }

    // Métodos para definir rotas e registrar arquivos swagger
    public function post($path, $controller, $action, $swaggerFile = null, $middlewares = []) {
        $this->routes['POST'][$path] = [
            'controller' => $controller,
            'action'     => $action,
            'middlewares' => $middlewares
        ];
        $this->registerSwaggerFile($swaggerFile);
    }

    public function get($path, $controller, $action, $swaggerFile = null, $middlewares = []) {
        $this->routes['GET'][$path] = [
            'controller' => $controller,
            'action'     => $action,
            'middlewares' => $middlewares
        ];
        $this->registerSwaggerFile($swaggerFile);
    }

    public function put($path, $controller, $action, $swaggerFile = null) {
        $this->routes['PUT'][$path] = [
            'controller' => $controller,
            'action'     => $action
        ];
        $this->registerSwaggerFile($swaggerFile);
    }

    public function delete($path, $controller, $action, $swaggerFile = null) {
        $this->routes['DELETE'][$path] = [
            'controller' => $controller,
            'action'     => $action
        ];
        $this->registerSwaggerFile($swaggerFile);
    }

    private function registerSwaggerFile($swaggerFile) {
        if ($swaggerFile && !in_array($swaggerFile, $this->swaggerFiles, true)) {
            $this->swaggerFiles[] = $swaggerFile;
        }
    }

    public function match($method, $uri) {
        $uri = $this->normalizeUri($uri);

        error_log("Tentando encontrar rota para: $method $uri");
        error_log("Rotas disponíveis: " . json_encode($this->routes[$method] ?? []));

        if (!isset($this->routes[$method])) {
            throw new HttpException('Método não permitido', 405, '00');
        }

        foreach ($this->routes[$method] as $route => $config) {
            $pattern = $this->convertRouteToPattern($route);
            error_log("Tentando padrão: $pattern");
            if (preg_match($pattern, $uri, $matches)) {
                error_log("Rota encontrada: $route");
                return [
                    'controller' => $config['controller'],
                    'action'     => $config['action'],
                    'params'     => array_slice($matches, 1),
                    'middlewares' => $config['middlewares'] ?? []
                ];
            }
        }

        throw new HttpException('Rota não encontrada', 404, '00');
    }

    private function normalizeUri($uri) {
        $uri = strtok($uri, '?');
        $uri = str_replace($this->basePath, '', $uri);
        $uri = '/' . trim($uri, '/');
        error_log("URI normalizada: $uri");
        return $uri;
    }

    private function convertRouteToPattern($route) {
        $pattern = preg_replace('/\{([a-zA-Z]+)\}/', '([^/]+)', $route);
        $pattern = '#^' . $pattern . '$#';
        error_log("Padrão convertido: $pattern");
        return $pattern;
    }

    public function getSwaggerFiles(): array
    {
        return $this->swaggerFiles;
    }

    public function addMiddleware($middleware) {
        $this->middlewares[] = $middleware;
    }
}
