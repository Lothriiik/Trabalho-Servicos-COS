package service

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "time"
)

type Aggregator struct {
    UserSvcURL  string
    GrupoSvcURL string
    Client      *http.Client
}

func NewAggregator(userURL, grupoURL string) *Aggregator {
    return &Aggregator{
        UserSvcURL:  userURL,
        GrupoSvcURL: grupoURL,
        Client:      &http.Client{Timeout: 10 * time.Second},
    }
}

func (a *Aggregator) FetchGrupo(uuid, token string) (map[string]interface{}, error) {
    req, _ := http.NewRequest("GET", fmt.Sprintf("%s/grupos/%s", a.GrupoSvcURL, uuid), nil)
    req.Header.Set("Authorization", token)
    resp, err := a.Client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    var data map[string]interface{}
    if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
        return nil, err
    }
    return data, nil
}

func (a *Aggregator) FetchUsuarios(ids []string, token string) ([]map[string]interface{}, error) {
    payload := map[string][]string{"usuario_ids": ids}
    body, _ := json.Marshal(payload)
    req, _ := http.NewRequest("POST", a.UserSvcURL+"/usuarios/listar", bytes.NewReader(body))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", token)
    resp, err := a.Client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    var users []map[string]interface{}
    if err := json.NewDecoder(resp.Body).Decode(&users); err != nil {
        return nil, err
    }
    return users, nil
}
