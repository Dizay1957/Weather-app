# Setting Environment Variables with Vercel CLI

If you prefer using the command line, you can set environment variables using Vercel CLI.

## Option 1: Using Vercel CLI (Recommended for Multiple Variables)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Link Your Project

```bash
cd "D:\PROJECTS\Weather app"
vercel link
```

Follow the prompts to link to your existing project.

### Step 4: Set Environment Variables

You can set variables one by one:

```bash
vercel env add NEXT_PUBLIC_WEATHER_API_KEY
```

When prompted:
- **Value**: Paste your API key
- **Environment**: Select all (Production, Preview, Development)

Or set from your local .env file:

```bash
# This will read from your local .env and set them in Vercel
vercel env pull .env.local
vercel env add NEXT_PUBLIC_WEATHER_API_KEY production preview development
```

### Step 5: Redeploy

```bash
vercel --prod
```

## Option 2: Manual Dashboard (Easier for Single Variable)

The dashboard method is actually easier for just one variable:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `NEXT_PUBLIC_WEATHER_API_KEY` with your API key value
3. Check all three environments
4. Click Save
5. Redeploy

## Which Method to Use?

- **Dashboard (Manual)**: Best for 1-2 variables, no CLI needed
- **Vercel CLI**: Best if you have many variables or want to automate

For this project, **the dashboard method is recommended** since you only need one variable.

