# Vercel Deployment Guide

This guide will help you deploy your Weather App to Vercel.

## ✅ What Works on Vercel

- ✅ **OpenWeatherMap API** - Works perfectly, just configure the API key
- ✅ **Weather Data** - All weather features work
- ✅ **Search & Geolocation** - Fully functional
- ✅ **Forecasts** - Hourly and daily forecasts work

## ⚠️ Database Limitation

**SQLite doesn't work on Vercel** because:
- Vercel uses serverless functions (stateless)
- File system is read-only except `/tmp`
- SQLite files don't persist between deployments

**Solution**: The app is designed to work **without the database**. Location saving is optional and the app gracefully handles database unavailability.

## 🚀 Deployment Steps

### 1. Push to GitHub

Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `Dizay1957/Weather-app`
4. Vercel will auto-detect Next.js settings

### 3. Configure Environment Variables

**IMPORTANT**: Add your OpenWeatherMap API key in Vercel:

1. In your Vercel project, go to **Settings** → **Environment Variables**
2. Add the following variables:

   **For Production, Preview, and Development:**
   ```
   NEXT_PUBLIC_WEATHER_API_KEY = your_openweathermap_api_key_here
   ```

   **Optional (for database - if you want to use PostgreSQL later):**
   ```
   DATABASE_URL = (leave empty for now, or use a PostgreSQL connection string)
   ```

3. Click **Save**

### 4. Deploy

1. Click **Deploy** button
2. Wait for the build to complete (usually 1-2 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

## 🔑 Getting Your API Key

If you don't have an API key yet:

1. Visit [openweathermap.org/api](https://openweathermap.org/api)
2. Create a free account
3. Go to [API Keys](https://home.openweathermap.org/api_keys)
4. Copy your API key
5. Add it to Vercel environment variables

## 📊 Database Options (Optional)

If you want location history to work, you have these options:

### Option 1: Use Vercel Postgres (Recommended)

1. In Vercel dashboard, go to **Storage** → **Create Database**
2. Select **Postgres**
3. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```
5. The `DATABASE_URL` will be automatically set by Vercel

### Option 2: Use External Database

- **Supabase** (free tier available)
- **PlanetScale** (free tier available)
- **Railway** (free tier available)

Update `DATABASE_URL` in Vercel with your connection string.

### Option 3: Keep It Simple

The app works perfectly **without a database**. Location saving is just a nice-to-have feature. All weather functionality works independently.

## 🔍 Verifying Deployment

After deployment, test:

1. ✅ Search for a city
2. ✅ Use geolocation button
3. ✅ Check hourly forecast
4. ✅ Check daily forecast
5. ✅ Verify weather data loads

## 🐛 Troubleshooting

### API Key Not Working

- Verify the environment variable name is exactly: `NEXT_PUBLIC_WEATHER_API_KEY`
- Make sure it's set for **Production** environment
- Redeploy after adding environment variables
- Check Vercel build logs for errors

### Build Fails

- Check that all dependencies are in `package.json`
- Verify Prisma is configured correctly
- Check build logs in Vercel dashboard

### Database Errors (Expected)

If you see database errors in logs but the app works, that's normal. The app is designed to work without the database.

## 📝 Environment Variables Summary

**Required:**
- `NEXT_PUBLIC_WEATHER_API_KEY` - Your OpenWeatherMap API key

**Optional:**
- `DATABASE_URL` - Only needed if you want location history (use PostgreSQL on Vercel)

## 🎉 That's It!

Your app should now be live on Vercel! The weather functionality will work perfectly, and location saving is optional.

