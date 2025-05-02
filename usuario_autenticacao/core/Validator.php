<?php
//usuario_autenticacao/core/Validator.php

namespace UsuarioAutenticacao\Core;

//Validator implementado como Singleton.
class Validator
{
    private static ?self $instance = null;

    private array $errors = [];

    private array $rulesMap = [
        'required'      => 'validateRequired',
        'string'        => 'validateString',
        'alnum'         => 'validateAlnum',
        'no_whitespace' => 'validateNoWhitespace',
        'min'           => 'validateMin',
        'max'           => 'validateMax',
    ];

    private function __construct() {}

    //Impede clonagem da instância.
    private function __clone() {}

    //Impede deserialização da instância.
    public function __wakeup(): void
    {
        throw new \Exception('Não é permitido deserializar esta classe');
    }

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function validate(array $data, array $rules): bool
    {
        $this->errors = [];

        foreach ($rules as $field => $fieldRules) {
            $hasValue = array_key_exists($field, $data);

            foreach ($fieldRules as $rule) {
                [$ruleName, $param] = $this->parseRule($rule);

                // Se não for required e não tiver valor, pula
                if ($ruleName !== 'required' && !$hasValue) {
                    continue;
                }

                if (isset($this->rulesMap[$ruleName])) {
                    $method = $this->rulesMap[$ruleName];
                    $this->$method($field, $hasValue ? $data[$field] : null, $param);
                }
            }
        }

        return empty($this->errors);
    }

    protected function parseRule(string $rule): array
    {
        if (str_contains($rule, ':')) {
            return explode(':', $rule, 2);
        }

        return [$rule, null];
    }

    private function validateRequired(string $field, $value, $param): void
    {
        if (!isset($value) || $value === '') {
            $this->errors[$field][] = "O campo {$field} é obrigatório.";
        }
    }

    private function validateString(string $field, $value, $param): void
    {
        if (!is_string($value)) {
            $this->errors[$field][] = "O campo {$field} deve ser uma string.";
        }
    }

    private function validateAlnum(string $field, $value, $param): void
    {
        if (!ctype_alnum((string) $value)) {
            $this->errors[$field][] = "O campo {$field} deve conter apenas letras e números.";
        }
    }

    private function validateNoWhitespace(string $field, $value, $param): void
    {
        if (preg_match('/\s/', (string) $value)) {
            $this->errors[$field][] = "O campo {$field} não pode conter espaços.";
        }
    }

    private function validateMin(string $field, $value, $param): void
    {
        if (is_string($value) && mb_strlen($value) < (int) $param) {
            $this->errors[$field][] = "O campo {$field} deve ter no mínimo {$param} caracteres.";
        }
    }

    private function validateMax(string $field, $value, $param): void
    {
        if (is_string($value) && mb_strlen($value) > (int) $param) {
            $this->errors[$field][] = "O campo {$field} deve ter no máximo {$param} caracteres.";
        }
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function getFirstError(): ?string
    {
        if (empty($this->errors)) {
            return null;
        }

        $firstField = array_key_first($this->errors);
        return $this->errors[$firstField][0];
    }
}