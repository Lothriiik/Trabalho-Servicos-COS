FROM php:8.2-cli

RUN apt-get update && apt-get install -y unzip git \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app
COPY . .

RUN composer install || true

EXPOSE 1410

CMD ["php", "-S", "0.0.0.0:1410", "-t", "."]