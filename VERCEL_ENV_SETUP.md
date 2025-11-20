# How to Add Environment Variables in Vercel

## Quick Steps to Fix "API key is missing" Error

### Step 1: Get Your API Key

1. Go to [https://home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)
2. Copy your API key (it should look like: `abc123def456...`)

### Step 2: Add Environment Variable in Vercel

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in to your account
   - Click on your **Weather-app** project

2. **Navigate to Settings**
   - Click on **"Settings"** tab (top navigation)
   - Click on **"Environment Variables"** (left sidebar)

3. **Add the Variable**
   - Click **"Add New"** button
   - Enter the following:
     ```
     Name: NEXT_PUBLIC_WEATHER_API_KEY
     Value: [paste your API key here]
     ```
   - **IMPORTANT**: Check all three environments:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
   - Click **"Save"**

4. **Redeploy**
   - Go to **"Deployments"** tab
   - Click the **"..."** menu on your latest deployment
   - Click **"Redeploy"**
   - OR push a new commit to trigger automatic redeploy

### Step 3: Verify It Works

After redeploying, your app should work! The error message will disappear and weather data will load.

## Visual Guide

```
Vercel Dashboard
  └── Your Project (Weather-app)
      └── Settings
          └── Environment Variables
              └── Add New
                  ├── Name: NEXT_PUBLIC_WEATHER_API_KEY
                  ├── Value: [your-api-key]
                  └── Environments: ✅ All three checked
```

## Common Mistakes

❌ **Wrong variable name**: Must be exactly `NEXT_PUBLIC_WEATHER_API_KEY`  
❌ **Only Production checked**: Check all three environments  
❌ **Forgot to redeploy**: You must redeploy after adding variables  
❌ **Spaces in the value**: Make sure there are no spaces before/after the API key

## Still Not Working?

1. **Check the variable name** - It must be exactly: `NEXT_PUBLIC_WEATHER_API_KEY`
2. **Verify the API key** - Test it at: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY`
3. **Check deployment logs** - In Vercel, go to your deployment → "Build Logs" to see if there are errors
4. **Redeploy** - Make sure you redeployed after adding the variable

## Need Help?

If you're still having issues:
1. Check Vercel's documentation: [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
2. Verify your API key is active on OpenWeatherMap
3. Make sure you're looking at the correct project in Vercel

