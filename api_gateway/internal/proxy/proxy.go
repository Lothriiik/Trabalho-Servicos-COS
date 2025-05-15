package proxy

import (
    "net/http"
    "net/http/httputil"
    "net/url"
)

func NewReverseProxy(target string) http.Handler {
    u, err := url.Parse(target)
    if err != nil {
        panic("invalid proxy target: " + err.Error())
    }
    return httputil.NewSingleHostReverseProxy(u)
}
