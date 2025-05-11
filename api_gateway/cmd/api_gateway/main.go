package main

import (
    "log"
    "net/http"
    "os"

    "api-gateway/internal/config"
    "api-gateway/internal/routes"
    _ "api-gateway/docs" // swagger

    "github.com/go-chi/chi/v5"
    "github.com/joho/godotenv"
    "github.com/go-chi/cors"
)

// @title API Gateway
// @version 1.0
// @description API Gateway para os serviços de usuários e grupos
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /
// @schemes http

// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.
func main() {

    if err := godotenv.Load(); err != nil {
        log.Println("⚠️  Arquivo .env não encontrado, continuando com variáveis do ambiente")
    }

    // Log de verificação (pode remover depois)
    log.Println("JWT Secret usado:", os.Getenv("JWT_SECRET_KEY"))
    log.Println("User Service URL:", os.Getenv("USER_SERVICE_URL"))
    log.Println("Grupo Service URL:", os.Getenv("GRUPO_SERVICE_URL"))

        cfg := config.New()

        router := chi.NewRouter()

        // ⬇️ Middlewares devem vir antes das rotas
        router.Use(cors.Handler(cors.Options{
            AllowedOrigins:   []string{"*"},
            AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
            AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
            ExposedHeaders:   []string{"Link"},
            AllowCredentials: true,
            MaxAge:           300,
        }))

        // ⬇️ Aqui você registra suas rotas internas
        router.Mount("/", routes.Setup(cfg))

    addr := ":8080" // porta padrão
    log.Printf("🚀 API Gateway ouvindo em %s\n", addr)
    log.Fatal(http.ListenAndServe(addr, router))
}
