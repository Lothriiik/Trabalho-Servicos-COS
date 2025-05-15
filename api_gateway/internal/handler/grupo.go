package handler

import (
    "bytes"
    "encoding/json"
    "io"
    "net/http"
    "fmt"
    "github.com/go-chi/chi/v5"

    "api-gateway/internal/config"
    "api-gateway/internal/dto"
    "api-gateway/internal/service"
)

type GrupoHandler struct {
    cfg *config.Config
    svc *service.Aggregator
}

func NewGrupoHandler(cfg *config.Config) *GrupoHandler {
    return &GrupoHandler{
        cfg: cfg,
        svc: service.NewAggregator(cfg.UserSvcURL, cfg.GrupoSvcURL),
    }
}

/*
// @Summary Cria um novo grupo
// @Description Cria um novo grupo no sistema
// @Tags grupos
// @Accept json
// @Produce json
// @Param request body dto.GrupoCriacao true "Dados do grupo"
// @Success 201 {object} dto.Grupo
// @Failure 400 {object} dto.ErrorResponse
// @Failure 422 {object} dto.ErrorResponse
// @Failure 500 {object} dto.ErrorResponse
// @Security Bearer
// @Router /grupos [post]
*/
func (h *GrupoHandler) CriarGrupo(w http.ResponseWriter, r *http.Request) {
    var in dto.GrupoCriacao
    if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
        http.Error(w, `{"error":"payload inválido"}`, http.StatusBadRequest)
        return
    }

    // Cria um novo buffer com o corpo da requisição
    bodyBytes, err := json.Marshal(in)
    if err != nil {
        http.Error(w, "Erro ao serializar dados", http.StatusInternalServerError)
        return
    }

    // Faz a requisição para o serviço de grupos
    req, err := http.NewRequest("POST", h.cfg.GrupoSvcURL+"/grupos", bytes.NewBuffer(bodyBytes))
    if err != nil {
        http.Error(w, "Erro ao criar requisição", http.StatusInternalServerError)
        return
    }
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", r.Header.Get("Authorization"))

    // Faz a requisição
    resp, err := h.svc.Client.Do(req)
    if err != nil {
        http.Error(w, "Erro ao fazer requisição para o serviço de grupos", http.StatusInternalServerError)
        return
    }
    defer resp.Body.Close()

    // Copia os headers da resposta
    for key, values := range resp.Header {
        for _, value := range values {
            w.Header().Add(key, value)
        }
    }

    // Copia o status code
    w.WriteHeader(resp.StatusCode)

    // Copia o corpo da resposta
    if _, err := io.Copy(w, resp.Body); err != nil {
        http.Error(w, "Erro ao copiar resposta", http.StatusInternalServerError)
        return
    }
    http.Error(w, "Endpoint temporariamente desativado, utilize a documentação do serviço de grupo em /grupo/docs", http.StatusServiceUnavailable)
}

// @Summary Obtém um grupo com seus usuários
// @Description Retorna os detalhes de um grupo junto com a lista de seus usuários
// @Tags grupos
// @Accept json
// @Produce json
// @Param grupo_uuid path string true "UUID do grupo"
// @Success 200 {object} dto.RespostaGrupoComUsuarios
// @Failure 400 {object} dto.ErrorResponse
// @Failure 404 {object} dto.ErrorResponse
// @Failure 500 {object} dto.ErrorResponse
// @Security Bearer
// @Router /grupo/{grupo_uuid} [get]
func (h *GrupoHandler) GrupoComUsuarios(w http.ResponseWriter, r *http.Request) {
    uuid := chi.URLParam(r, "grupo_uuid")
    token := r.Header.Get("Authorization")

    grpRaw, err := h.svc.FetchGrupo(uuid, token)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // ⬇️ PRINT DEBUG do grupo
    fmt.Println("📦 GRUPO RECEBIDO:")
    if grpJSON, err := json.MarshalIndent(grpRaw, "", "  "); err == nil {
        fmt.Println(string(grpJSON))
    }

    idsIface, _ := grpRaw["usuarios"].([]interface{})
    var ids []string
    for _, v := range idsIface {
        if idStr, ok := v.(string); ok {
            ids = append(ids, idStr)
        }
    }

    var usersRaw []map[string]interface{}
    if len(ids) > 0 {
        usersRaw, err = h.svc.FetchUsuarios(ids, token)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        // ⬇️ PRINT DEBUG dos usuários
        fmt.Println("👥 USUÁRIOS RECEBIDOS:")
        if usersJSON, err := json.MarshalIndent(usersRaw, "", "  "); err == nil {
            fmt.Println(string(usersJSON))
        }
    } else {
        usersRaw = []map[string]interface{}{} // garante slice vazio
        fmt.Println("👥 Nenhum usuário para buscar.")
    }

    // monta resposta DTO
    // monta resposta DTO
    var resp dto.RespostaGrupoComUsuarios
    resp.Grupo.UUID = grpRaw["grupo_uuid"].(string)
    resp.Grupo.Titulo = grpRaw["grupo_titulo"].(string)
    resp.Grupo.Descricao = grpRaw["grupo_descricao"].(string)

    // Garante que seja sempre slice, mesmo se vazio
    resp.Grupo.Usuarios = make([]dto.Usuario, 0)

    for _, u := range usersRaw {
        resp.Grupo.Usuarios = append(resp.Grupo.Usuarios, dto.Usuario{
            UUID:     u["usuario_uuid"].(string),
            Nome:     u["usuario_nome"].(string),
            Username: u["usuario_username"].(string),
        })
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(resp)
}

