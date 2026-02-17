# Fikr Flow Enterprise - Deployment Guide

## Quick Deploy (5 min)

### Frontend → Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel` from `my-app` folder
3. Link to GitHub repo (optional)
4. Get live URL immediately

### Backend → Railway
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select `backend` folder
4. Set `PORT=8888`
5. Add environment variables from `.env`
6. Get backend URL
7. Update frontend `.env.production`:
```env
NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app/api
```

## Alternative: Render.com (Free)
- Frontend: Deploy `my-app` folder
- Backend: Deploy `backend` folder
- Both free tier available
- Same process as Railway

## Test Credentials
- Email: `Saif@fikrflow.com`
- Password: `Admin123!`

## Database
- SQLite (included, no setup needed)
- Auto-migrated on first run
