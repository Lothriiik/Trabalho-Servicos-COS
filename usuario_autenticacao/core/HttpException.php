<?php
//core/exceptions/HttpException.php

namespace UsuarioAutenticacao\core;

use Exception;

class HttpException extends Exception
{
    protected int $statusCode;
    protected string $errorCode;

    public function __construct(string $message, int $statusCode = 500, string $errorCode = '00')
    {
        parent::__construct($message);
        $this->statusCode = $statusCode;
        $this->errorCode   = $errorCode;
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function getErrorCode(): string
    {
        return $this->errorCode;
    }

    public function toArray(): array
    {
        return [
            'statusCode' => $this->statusCode,
            'error'      => $this->getMessage(),
            'ErrorCode'  => $this->errorCode,
        ];
    }
}
// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status