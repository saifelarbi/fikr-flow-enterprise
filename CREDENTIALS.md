# Fikr Flow - Admin Credentials

## 🎯 Dashboard Access

**Frontend URL:** http://192.168.1.161:3000

---

## 📋 Admin Accounts

### Account 1: Admin (Primary)
- **Email:** admin@example.com
- **Password:** admin123
- **Role:** Full Admin
- **Access:** All features

### Account 2: Test User
- **Email:** test@example.com
- **Password:** password123
- **Role:** Regular User
- **Access:** Dashboard features

---

## 💾 Database Setup

### Create Database (SQLite)
```bash
cd "C:\Users\user\Desktop\Fikr Flow\backend"
touch database/database.sqlite
```

### Run Migrations & Seed
```bash
php artisan migrate --seed
```

This will:
- ✅ Create all tables (users, clients, invoices, expenses, etc.)
- ✅ Seed admin users with credentials above
- ✅ Create initial data

---

## 🚀 Start Servers

### Terminal 1 - Frontend
```bash
cd "C:\Users\user\Desktop\Fikr Flow\my-app"
npm run dev
```
Runs on: http://192.168.1.161:3000

### Terminal 2 - Backend
```bash
cd "C:\Users\user\Desktop\Fikr Flow\backend"
php artisan serve
```
Runs on: http://localhost:8000/api

---

## 🔑 How to Login

1. **On Phone:** Open http://192.168.1.161:3000
2. **Click:** "Sign in"
3. **Enter:**
   - Email: `admin@example.com`
   - Password: `admin123`
4. **Click:** "Sign in"

---

## ⚙️ Features

Once logged in, you'll see:

✅ **Dashboard**
- Revenue, Expenses, Profit cards
- Revenue vs Expenses chart
- Invoice distribution pie chart
- Quick summary statistics

✅ **Navigation**
- Clients (ready for Phase 2 API)
- Invoices (ready for Phase 2 API)
- Expenses (ready for Phase 2 API)
- Settings (profile & security)

---

## 📝 Notes

- **Frontend:** Currently running with mock data (no real API yet)
- **Backend:** Laravel setup complete, waiting for Phase 2 implementation
- **Database:** SQLite ready for local development
- **Session:** Persists using localStorage (refreshing page keeps you logged in)

---

## 🔄 Demo Mode

The frontend is in **demo mode** with mock statistics:
- Total Revenue: $50,000
- Total Expenses: $15,000
- Net Profit: $35,000
- 25 total invoices (10 buying, 15 selling)

Once Phase 2 backend is connected, real data will replace demo data.

---

## 🆘 Troubleshooting

**Can't access http://192.168.1.161:3000?**
- ✅ Make sure phone is on same WiFi
- ✅ Check IP: Run `ipconfig | findstr IPv4` on PC
- ✅ Use that IP instead of 192.168.1.161
- ✅ Make sure npm dev server is running

**Dashboard showing errors?**
- ✅ All components are created locally
- ✅ No external API calls yet (demo data only)
- ✅ Refresh page (Ctrl+R or Cmd+R on phone)

**Need to reset database?**
```bash
rm database/database.sqlite
touch database/database.sqlite
php artisan migrate --seed
```

---

**Dashboard is ready! Enjoy! 🎉**
