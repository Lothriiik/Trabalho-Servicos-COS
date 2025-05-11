package handler

import (
    "net/http"
    "api-gateway/internal/config"
    "api-gateway/internal/proxy"
)

type UsuarioHandler struct {
    cfg *config.Config
}

func NewUsuarioHandler(cfg *config.Config) *UsuarioHandler {
    return &UsuarioHandler{cfg: cfg}
}

/*
// @Summary Cria um novo usuário
// @Description Cria um novo usuário no sistema
// @Tags usuarios
// @Accept json
// @Produce json
// @Param request body dto.UsuarioCriacao true "Dados do usuário"
// @Success 201 {object} dto.Usuario
// @Failure 400 {object} dto.ErrorResponse
// @Failure 422 {object} dto.ErrorResponse
// @Failure 500 {object} dto.ErrorResponse
// @Router /usuario [post]
*/
func (h *UsuarioHandler) CriarUsuario(w http.ResponseWriter, r *http.Request) {
    // aqui você pode validar o DTO se quiser
    // repassa diretamente via proxy
    handler := proxy.NewReverseProxy(h.cfg.UserSvcURL)
    handler.ServeHTTP(w, r)
    http.Error(w, "Endpoint temporariamente desativado, utilize a documentação do serviço de usuário em /usuario/docs", http.StatusServiceUnavailable)
}
