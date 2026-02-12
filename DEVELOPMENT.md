# 🛠️ Development Guide

## Quick Start (5 minutes)

### 1. Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan migrate
php artisan serve
```

✅ Backend running on: http://localhost:8000

### 2. Frontend Setup
```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
npm run dev
```

✅ Frontend running on: http://localhost:3000

---

## Testing

### Test API Health
```bash
curl http://localhost:8000/api/health
```

### Test Registration
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the token from response, then:

### Test Clients CRUD
```bash
TOKEN="your_token_here"

# Create client
curl -X POST http://localhost:8000/api/clients \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corp",
    "email": "contact@acme.com",
    "phone": "+1234567890"
  }'

# List clients
curl -X GET http://localhost:8000/api/clients \
  -H "Authorization: Bearer $TOKEN"

# Search clients
curl -X GET "http://localhost:8000/api/clients?search=acme" \
  -H "Authorization: Bearer $TOKEN"
```

### Test Invoices
```bash
# Create invoice
curl -X POST http://localhost:8000/api/invoices \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
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
  }'

# List invoices
curl -X GET http://localhost:8000/api/invoices \
  -H "Authorization: Bearer $TOKEN"

# Get selling invoices
curl -X GET "http://localhost:8000/api/invoices?type=SELLING" \
  -H "Authorization: Bearer $TOKEN"
```

### Test Expenses
```bash
# Create expense
curl -X POST http://localhost:8000/api/expenses \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Salary",
    "amount": 2000,
    "description": "Monthly salary",
    "date": "2026-02-12"
  }'

# List expenses
curl -X GET http://localhost:8000/api/expenses \
  -H "Authorization: Bearer $TOKEN"

# Filter by category
curl -X GET "http://localhost:8000/api/expenses?category=Salary" \
  -H "Authorization: Bearer $TOKEN"
```

### Test Dashboard Stats
```bash
curl -X GET http://localhost:8000/api/stats/summary \
  -H "Authorization: Bearer $TOKEN"
```

---

## File Structure

### Backend Models

**User** - User authentication
**Client** - Client information
**Invoice** - Invoice records (BUYING/SELLING)
**InvoiceItem** - Line items in invoice
**Expense** - Expense records

### Backend Controllers

- `AuthController` - Authentication (register, login, logout)
- `ClientController` - Client CRUD operations
- `InvoiceController` - Invoice management
- `ExpenseController` - Expense tracking
- `StatsController` - Dashboard statistics

### Frontend Components (To be created)

- `Sidebar` - Navigation sidebar
- `DashboardCard` - Statistics cards
- `ClientTable` - Client list table
- `ClientForm` - Create/edit client modal
- `InvoiceForm` - Create invoice form
- `ExpenseForm` - Create expense form

---

## Environment Variables

### Backend (.env)
```
APP_NAME=Fikr Flow
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
JWT_SECRET=your-secret-key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## Key Features Implemented

✅ **Authentication**
- Register new user
- Login with email/password
- JWT token generation

✅ **Clients**
- Create, read, update, delete clients
- Search clients by name/email
- List all clients

✅ **Invoices**
- Create buying/selling invoices
- Add line items
- Calculate totals with tax
- Filter by invoice type
- List invoices with pagination

✅ **Expenses**
- Create expenses with categories
- Filter by category and date range
- Track expense totals

✅ **Dashboard**
- Summary statistics (revenue, expenses, profit)
- Invoice count and totals
- Expense breakdown by category

---

## Next Steps (Phase 2)

- [ ] Create Next.js pages and components
- [ ] Build responsive UI with Tailwind
- [ ] Add real authentication (JWT validation)
- [ ] Add error handling and validation
- [ ] Add loading states
- [ ] Create modals for forms
- [ ] Add data visualization (charts)
- [ ] Deploy to Vercel and Heroku

---

## Troubleshooting

### Port Already in Use
```bash
# Change Laravel port
php artisan serve --port=8001

# Change Next.js port
npm run dev -- -p 3001
```

### CORS Issues
Make sure the backend is set up correctly with CORS headers.

### Database Issues
```bash
# Reset database
php artisan migrate:reset
php artisan migrate
```

---

## Performance Tips

- Use pagination for large datasets
- Cache statistics queries
- Optimize database indexes
- Use lazy loading for relations

---

**Happy Coding! 🚀**
