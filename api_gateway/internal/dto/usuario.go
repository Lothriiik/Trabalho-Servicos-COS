package dto

type UsuarioCriacao struct {
    Nome     string `json:"usuario_nome" example:"João da Silva"`
    Username string `json:"usuario_username" example:"joaosilva"`
    Senha    string `json:"usuario_senha" example:"senha123"`
}

type Usuario struct {
    UUID     string `json:"usuario_uuid" example:"uuid"`
    Nome     string `json:"usuario_nome" example:"João da Silva"`
    Username string `json:"usuario_username" example:"joao.silva"`
}

type ErrorResponse struct {
    Error string `json:"error" example:"mensagem de erro"`
}
