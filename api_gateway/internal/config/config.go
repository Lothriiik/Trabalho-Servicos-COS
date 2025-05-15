package config

import (
    "log"
    "os"

    "github.com/joho/godotenv"
)

// Config contém todas as configurações da aplicação
type Config struct {
    // URLs dos serviços
    UserSvcURL  string
    GrupoSvcURL string

    // Configurações de autenticação
    JWTSecret string
}

// New cria uma nova configuração carregando valores do ambiente
func New() *Config {
    _ = godotenv.Load()

    secret := os.Getenv("JWT_SECRET_KEY")
    if secret == "" {
        log.Fatal("JWT_SECRET_KEY não definido")
    }

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    return &Config{
        UserSvcURL:  getEnv("USER_SVC_URL", "http://localhost:1410"),
        GrupoSvcURL: getEnv("GRUPO_SVC_URL", "http://localhost:1411"),
        JWTSecret:   secret,
    }
}

// getEnv obtém uma variável de ambiente ou retorna um valor padrão
func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}
