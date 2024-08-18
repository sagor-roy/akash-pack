# Use PHP 7.4 with Apache
FROM php:7.4-apache

# Set the working directory
WORKDIR /var/www/html

# Update the package list and install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    re2c \
    libaio1 \
    unzip \
    wget

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Expose the default port
EXPOSE 80
