<?php
//core/BaseDTO.php

namespace UsuarioAutenticacao\Core;

use ReflectionClass;

abstract class BaseDTO
{
    protected array $dbFields = [];
    protected array $responseFields = [];

    public function __construct(array $dados = [])
    {
        $this->validar($dados);
        $this->autoBind($dados);
    }

    abstract protected function validar(array $dados): void;

    private function autoBind(array $dados): void
    {
        $reflection = new ReflectionClass($this);
        $properties = $reflection->getProperties();

        foreach ($properties as $property) {
            $propertyName = $property->getName();
            if (array_key_exists($propertyName, $dados)) {
                $property->setAccessible(true);
                $property->setValue($this, $dados[$propertyName]);
            }
        }
    }

    private function toArray(array $fields): array
    {
        $reflection = new ReflectionClass($this);
        $properties = $reflection->getProperties();
        $array = [];

        foreach ($properties as $property) {
            $property->setAccessible(true);
            $value = $property->getValue($this);
            $propertyName = $property->getName();

            if (in_array($propertyName, $fields) && isset($value) && !empty($value)) {
                $array[$propertyName] = $value;
            }
        }

        return $array;
    }

    public function toArrayDB(): array
    {
        return $this->toArray($this->dbFields);
    }

    public function toArrayResponse(): array
    {
        return $this->toArray($this->responseFields);
    }
}
