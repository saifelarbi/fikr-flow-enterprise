# 🚀 Fikr Flow Enterprise

Professional Business Management System - Laravel API + Next.js Dashboard

## 📋 Overview

Fikr Flow Enterprise is a comprehensive business management platform designed to help entrepreneurs manage their clients, invoices, and expenses efficiently.

**Tech Stack:**
- **Backend:** Laravel 10 + SQLite
- **Frontend:** Next.js 14 + Tailwind CSS
- **Authentication:** JWT-based
- **Deployment:** Vercel (Frontend) + Heroku/Railway (Backend)

## ✨ Features

### Phase 1 (MVP - Today)
- ✅ User Authentication (Register/Login)
- ✅ Client Management (CRUD)
- ✅ Basic Invoicing (Buying/Selling)
- ✅ Expense Tracking
- ✅ Dashboard with Statistics

### Phase 2 (Next)
- 📋 Advanced Invoicing (PDF Export, Email)
- 📊 Advanced Analytics & Reports
- 🔔 Notifications
- 📱 Mobile App

### Phase 3 (Future)
- 💳 Payment Integration
- 📈 Financial Forecasting
- 🤖 AI-powered Insights
- 🌍 Multi-currency Support

---

## 🏗️ Project Structure

```
fikr-flow-enterprise/
├── backend/
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── ClientController.php
│   │   │   ├── InvoiceController.php
│   │   │   ├── ExpenseController.php
│   │   │   └── StatsController.php
│   │   └── Models/
│   │       ├── User.php
│   │       ├── Client.php
│   │       ├── Invoice.php
│   │       ├── InvoiceItem.php
│   │       └── Expense.php
│   ├── routes/
│   │   └── api.php
│   ├── database/
│   │   └── migrations/
│   └── composer.json
│
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── clients/page.tsx
│   │   │   ├── invoices/page.tsx
│   │   │   └── expenses/page.tsx
│   │   ├── auth/
│   │   │   └── login/page.tsx
│   │   └── layout.tsx
│   ├── lib/
│   │   └── api.ts
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── DashboardCard.tsx
│   │   └── ClientTable.tsx
│   ├── package.json
│   └── next.config.js
│
└── README.md
```

---

## 🚀 Quick Start

### Backend Setup

```bash
cd backend

# Install dependencies
composer install

# Setup environment
cp .env.example .env

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Start server
php artisan serve
```

**API available at:** `http://localhost:8000/api`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Start development server
npm run dev
```

**Dashboard available at:** `http://localhost:3000`

---

## 📚 API Documentation

### Authentication

**Register**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Login**
```bash
POST /api/auth/login

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com" },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Clients

**List Clients**
```bash
GET /api/clients?search=john
Authorization: Bearer {token}
```

**Create Client**
```bash
POST /api/clients
Authorization: Bearer {token}

{
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

**Update Client**
```bash
PUT /api/clients/{id}
Authorization: Bearer {token}
```

**Delete Client**
```bash
DELETE /api/clients/{id}
Authorization: Bearer {token}
```

### Invoices

**Create Invoice (Buying/Selling)**
```bash
POST /api/invoices
Authorization: Bearer {token}

{
  "client_id": 1,
  "type": "SELLING",
  "invoice_number": "INV-001",
  "amount": 5000,
  "tax": 500,
  "date": "2026-02-12",
  "items": [
    {
      "description": "Product A",
      "quantity": 2,
      "unit_price": 2000
    }
  ]
}
```

**Get Invoices by Type**
```bash
GET /api/invoices?type=SELLING
Authorization: Bearer {token}
```

### Expenses

**Create Expense**
```bash
POST /api/expenses
Authorization: Bearer {token}

{
  "category": "Salary",
  "amount": 2000,
  "description": "Monthly salary",
  "date": "2026-02-12"
}
```

**Filter Expenses**
```bash
GET /api/expenses?category=Salary&start_date=2026-01-01&end_date=2026-02-28
Authorization: Bearer {token}
```

### Dashboard Stats

**Summary Statistics**
```bash
GET /api/stats/summary
Authorization: Bearer {token}
```

Response:
```json
{
  "totalRevenue": 50000,
  "totalExpenses": 15000,
  "profit": 35000,
  "invoices": {
    "buying": 10,
    "selling": 15
  },
  "topExpenseCategory": "Salary"
}
```

---

## 🔗 GitHub Issues

All development tasks are tracked as GitHub issues:

📋 [View Issues](https://github.com/saifelarbi/fikr-flow-enterprise/issues)

- Phase 1: Setup & Core APIs (#1-6)
- Phase 2: Frontend Components (#7-10)
- Phase 3: Deployment & Documentation (#12-13)

---

## 🚢 Deployment

### Deploy Frontend to Vercel

```bash
cd frontend
npm run build
vercel deploy
```

### Deploy Backend to Heroku

```bash
cd backend
heroku create fikr-flow-api
heroku config:set APP_KEY=...
git push heroku main
```

---

## 📊 Testing

### Test Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Client Creation
```bash
curl -X POST http://localhost:8000/api/clients \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Client","email":"client@example.com"}'
```

---

## 🤝 Contributing

Contributions welcome! Please:
1. Create a feature branch
2. Make your changes
3. Submit a pull request

---

## 📄 License

MIT License - See LICENSE.md

---

## 📞 Support

Questions? Open an issue on GitHub: https://github.com/saifelarbi/fikr-flow-enterprise/issues

---

**Built with ❤️ for Entrepreneurs**
