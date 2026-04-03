#!/bin/bash

# Generate app key if needed
php artisan key:generate --force

# Run migrations
php artisan migrate --force

# Start Laravel server
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
