#!/bin/bash

# Create Laravel API backend
echo "🚀 Creating Laravel Backend..."

mkdir -p backend

cd backend

# Create Laravel directory structure
mkdir -p app/Http/Controllers
mkdir -p app/Models
mkdir -p database/migrations
mkdir -p routes
mkdir -p config
mkdir -p storage/logs
mkdir -p tests/Feature

# Create .env file
cat > .env << 'EOF'
APP_NAME="Fikr Flow"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=database.sqlite

JWT_SECRET=your-secret-key-here
EOF

# Create .env.example
cp .env .env.example

echo "✅ Laravel structure created"
