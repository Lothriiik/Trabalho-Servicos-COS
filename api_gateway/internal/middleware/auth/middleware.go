package auth

import (
    "fmt"
    "log"
    "net/http"
    "strings"

    "github.com/golang-jwt/jwt/v5"
    "api-gateway/internal/config"
)

// Middleware valida o token JWT nas requisições
func Middleware(cfg *config.Config) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            // Obtém o token do header Authorization
            auth := r.Header.Get("Authorization")
            if !strings.HasPrefix(auth, "Bearer ") {
                log.Printf("Token não fornecido ou formato inválido: %s", auth)
                http.Error(w, "Token de autenticação não fornecido", http.StatusUnauthorized)
                return
            }

            // Extrai o token
            tokenString := strings.TrimPrefix(auth, "Bearer ")
            log.Printf("Token recebido: %s", tokenString)
            log.Printf("JWT Secret usado: %s", cfg.JWTSecret)

            // Valida o token
            token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
                // Verifica o método de assinatura
                if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                    return nil, fmt.Errorf("método de assinatura inesperado: %v", token.Header["alg"])
                }
                return []byte(cfg.JWTSecret), nil
            })

            if err != nil {
                log.Printf("Erro ao validar token: %v", err)
                http.Error(w, "Token inválido", http.StatusUnauthorized)
                return
            }

            if !token.Valid {
                log.Printf("Token marcado como inválido")
                http.Error(w, "Token inválido", http.StatusUnauthorized)
                return
            }

            // Token válido, continua para o próximo handler
            log.Printf("Token válido, prosseguindo com a requisição")
            next.ServeHTTP(w, r)
        })
    }
} 