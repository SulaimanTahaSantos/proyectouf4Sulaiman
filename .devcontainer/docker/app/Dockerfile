# Usa la imagen base con PHP, Apache y Node.js
ARG PHP_EXTENSIONS="mysqli pgsql pdo_mysql pdo_pgsql"
FROM thecodingmachine/php:8.2-v4-apache-node20

# Establece la carpeta de trabajo
WORKDIR /app

# Copia todos los archivos del proyecto
COPY . /app

# Instala dependencias PHP
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Configura Laravel (env y clave de aplicación)
RUN cp .env.example .env && php artisan key:generate

# Mueve a frontend, instala dependencias y compila Next.js
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Vuelve a raíz del proyecto Laravel
WORKDIR /app

# Ejecuta migraciones y otras optimizaciones
RUN php artisan migrate --force
RUN php artisan optimize
RUN php artisan storage:link

# Asigna permisos necesarios para Laravel
RUN chmod -R 777 storage bootstrap/cache
