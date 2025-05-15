package routes

import (
    "net/http"

    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
    httpSwagger "github.com/swaggo/http-swagger"
    _ "api-gateway/docs"

    "api-gateway/internal/config"
    "api-gateway/internal/handler"
    "api-gateway/internal/middleware/auth"
)

// Setup configura todas as rotas da aplicação
func Setup(cfg *config.Config) http.Handler {
    r := chi.NewRouter()

    // Middlewares globais
    r.Use(middleware.Logger)
    r.Use(middleware.Recoverer)

   // Redireciona /docs para /docs/
   r.Get("/docs", func(w http.ResponseWriter, r *http.Request) {
       http.Redirect(w, r, "/docs/", http.StatusMovedPermanently)
   })

   // Serve a interface Swagger UI em /docs/
   r.Get("/docs/*", httpSwagger.Handler(
       httpSwagger.URL("/docs/doc.json"),
   ))

    // Handlers
    //usuarioHandler := handler.NewUsuarioHandler(cfg)
    grupoHandler := handler.NewGrupoHandler(cfg)

    // Grupo de rotas que requerem autenticação
    r.Group(func(r chi.Router) {
        r.Use(auth.Middleware(cfg)) // valida JWT apenas para estas rotas

        // Rotas de grupos
        //r.Post("/grupos", grupoHandler.CriarGrupo)
        r.Get("/grupo/{grupo_uuid}", grupoHandler.GrupoComUsuarios)
    })

    // Rotas públicas (sem autenticação)
    r.Group(func(r chi.Router) {
        // Rotas de usuários
        //r.Post("/usuario", usuarioHandler.CriarUsuario)
    })

    return r
}
