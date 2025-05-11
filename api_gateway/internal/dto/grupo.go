package dto

type GrupoCriacao struct {
    Titulo    string `json:"grupo_titulo" example:"Grupo IA"`
    Descricao string `json:"grupo_descricao" example:"Discussões de IA"`
}

type Grupo struct {
    UUID      string `json:"grupo_uuid" example:"uuid"`
    Titulo    string `json:"grupo_titulo" example:"Grupo IA"`
    Descricao string `json:"grupo_descricao" example:"Discussões de IA"`
}

type RespostaGrupoComUsuarios struct {
    Grupo struct {
        UUID      string    `json:"grupo_uuid" example:"d290f1ee-6c54-4b01-90e6-d701748f0851"`
        Titulo    string    `json:"grupo_titulo" example:"Grupo de Estudo de Go"`
        Descricao string    `json:"grupo_descricao" example:"Grupo destinado a discussões sobre Golang"`
        Usuarios  []Usuario `json:"usuarios"`
    } `json:"grupo"`
}