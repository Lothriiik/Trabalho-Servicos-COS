FROM golang:1.24.3-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go install github.com/swaggo/swag/cmd/swag@latest
RUN swag init -g cmd/api_gateway/main.go -o docs

RUN go build -o api-gateway ./cmd/api_gateway


FROM alpine:latest

RUN apk add --no-cache ca-certificates

WORKDIR /root/

COPY --from=builder /app/api-gateway .

COPY --from=builder /app/docs ./docs

COPY .env .

EXPOSE 8080

CMD ["./api-gateway"]