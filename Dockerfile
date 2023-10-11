FROM php:7.1-apache
WORKDIR /var/www/html

RUN apt update
RUN apt-get install -y build-essential re2c libaio1 unzip wget
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN a2enmod rewrite
