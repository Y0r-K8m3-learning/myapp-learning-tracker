FROM php:8.4-fpm

RUN apt update \
  && apt install -y default-mysql-client zlib1g-dev libzip-dev unzip \
  && docker-php-ext-install pdo_mysql zip

RUN curl -sS https://getcomposer.org/installer | php \
  && mv composer.phar /usr/local/bin/composer \
  && composer self-update

RUN apt-get update \
    && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

# php.ini の配置
COPY php.ini /usr/local/etc/php/php.ini

# composerインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ARG APP_USER_ID
ARG APP_USER_NAME
RUN useradd -u ${APP_USER_ID} -m ${APP_USER_NAME}

WORKDIR /var/www

USER ${APP_USER_NAME}

EXPOSE 9000
CMD ["php-fpm"]

