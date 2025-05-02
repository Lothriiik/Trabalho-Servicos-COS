<?php

namespace UsuarioAutenticacao\Core;

class JWT
{
    private static function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64UrlDecode(string $data): string
    {
        $remainder = strlen($data) % 4;
        if ($remainder) {
            $data .= str_repeat('=', 4 - $remainder);
        }
        return base64_decode(strtr($data, '-_', '+/'));
    }

    public static function encode(array $payload, string $secret, string $alg = 'HS256'): string
    {
        $header = [
            'typ' => 'JWT',
            'alg' => $alg
        ];

        $headerJson = json_encode($header, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $payloadJson = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        $headerEncoded = self::base64UrlEncode($headerJson);
        $payloadEncoded = self::base64UrlEncode($payloadJson);

        $signature = self::sign("$headerEncoded.$payloadEncoded", $secret, $alg);
        $signatureEncoded = self::base64UrlEncode($signature);

        return "$headerEncoded.$payloadEncoded.$signatureEncoded";
    }

    public static function decode(string $jwt, string $secret, bool $verify = true): ?array
    {
        $parts = explode('.', $jwt);

        if (count($parts) !== 3) {
            throw new \Exception('Token inválido: partes incorretas');
        }

        list($headerEncoded, $payloadEncoded, $signatureEncoded) = $parts;

        $header = json_decode(self::base64UrlDecode($headerEncoded), true);
        $payload = json_decode(self::base64UrlDecode($payloadEncoded), true);
        $signature = self::base64UrlDecode($signatureEncoded);

        if ($verify) {
            $alg = $header['alg'] ?? null;
            if (!$alg) {
                throw new \Exception('Algoritmo não especificado no header');
            }

            $expectedSignature = self::sign("$headerEncoded.$payloadEncoded", $secret, $alg);

            if (!hash_equals($expectedSignature, $signature)) {
                throw new \Exception('Assinatura inválida');
            }
        }

        return $payload;
    }

    private static function sign(string $data, string $secret, string $alg): string
    {
        switch (strtoupper($alg)) {
            case 'HS256':
                return hash_hmac('sha256', $data, $secret, true);
            case 'HS384':
                return hash_hmac('sha384', $data, $secret, true);
            case 'HS512':
                return hash_hmac('sha512', $data, $secret, true);
            default:
                throw new \Exception('Algoritmo não suportado');
        }
    }
}

/*

// Exemplo de uso:
$secret = 'minha_chave_secreta';

// Gerar um token
$payload = [
    'sub' => '1234567890',
    'name' => 'John Doe',
    'iat' => time()
];

$token = JWT::encode($payload, $secret);
echo "Token gerado: " . $token . "\n";

// Validar um token
try {
    $dados = JWT::decode($token, $secret);
    echo "Payload decodificado:\n";
    print_r($dados);
} catch (\Exception $e) {
    echo "Erro ao decodificar: " . $e->getMessage();
}

*/

//https://datatracker.ietf.org/doc/html/rfc7515