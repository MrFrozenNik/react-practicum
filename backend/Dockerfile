FROM php:8.4-cli-alpine


RUN apk add --no-cache \
      git \
      unzip \
      sqlite \
      sqlite-dev \
      $PHPIZE_DEPS \
  && docker-php-ext-install pdo pdo_sqlite bcmath \
  && apk del $PHPIZE_DEPS


COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www


COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-interaction --prefer-dist


COPY . .

RUN composer dump-autoload --optimize \
  && mkdir -p database \
  && touch database/database.sqlite

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
