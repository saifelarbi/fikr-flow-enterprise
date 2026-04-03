FROM php:8.2-cli

# Install required extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Make start.sh executable
RUN chmod +x start.sh

# Expose port
EXPOSE 8000

# Run the app
CMD ["bash", "start.sh"]
