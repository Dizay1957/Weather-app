# Weather App - Modern Weather Forecast

A beautiful and modern weather application built with Next.js, TypeScript, and Tailwind CSS, using OpenWeatherMap API.

![Weather App](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🌤️ **Real-time Weather Data** - Updated every 10 minutes
- 🔍 **City Search** - Search for any city worldwide
- 📍 **Geolocation** - Automatic location detection
- 📊 **24-Hour Forecast** - Detailed hourly predictions
- 📅 **8-Day Forecast** - Extended daily weather outlook
- ⚠️ **Weather Alerts** - Government weather warnings (when available)
- 💾 **Location History** - Save searched locations to database
- 🎨 **Modern UI** - Beautiful glassmorphism design with dark theme
- 📱 **Responsive** - Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- **OpenWeatherMap API Key** (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dizay1957/Weather-app.git
   cd Weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key_here
   ```
   
   Get your free API key:
   - Visit [openweathermap.org/api](https://openweathermap.org/api)
   - Create a free account
   - Go to [API Keys](https://home.openweathermap.org/api_keys)
   - Copy your API key

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
.
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── onecall/      # One Call API 3.0 endpoint
│   │   ├── weather/      # Current weather endpoint
│   │   ├── forecast/     # Forecast endpoint
│   │   └── locations/    # Location management
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React Components
│   ├── WeatherCard.tsx    # Main weather display
│   ├── DailyForecast.tsx  # 8-day forecast
│   ├── HourlyForecast.tsx # 24-hour forecast
│   ├── WeatherAlerts.tsx  # Weather alerts
│   └── SearchBar.tsx     # Search component
├── lib/                   # Utilities
│   ├── weather.ts         # Weather API service
│   └── db.ts              # Prisma client
└── prisma/                # Database schema
    └── schema.prisma
```

## 🛠️ Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Modern ORM for database
- **SQLite** - Lightweight database
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons
- **OpenWeatherMap API** - Weather data provider

## 📡 API Routes

### One Call API 3.0 (Recommended)
- `GET /api/onecall?city={city}` - Complete weather data by city
- `GET /api/onecall?lat={lat}&lon={lon}` - Complete weather data by coordinates
- `GET /api/onecall?city={city}&exclude=minutely,alerts` - Exclude specific data

### Standard API (Fallback)
- `GET /api/weather?city={city}` - Current weather by city
- `GET /api/weather?lat={lat}&lon={lon}` - Current weather by coordinates
- `GET /api/forecast?city={city}` - 5-day forecast

### Location Management
- `GET /api/locations` - Get saved locations
- `POST /api/locations` - Save a location

## 🎨 Design Features

- **Glassmorphism** - Modern frosted glass effect
- **Dark Theme** - Beautiful gradient background
- **Smooth Animations** - Fade-in effects and transitions
- **Responsive Grid** - Adapts to all screen sizes
- **Interactive Cards** - Hover effects and visual feedback

## 📝 One Call API 3.0

This app uses OpenWeatherMap's One Call API 3.0 which provides:

- **Real-time data** - Updated every 10 minutes
- **Hourly forecasts** - 48 hours of detailed predictions
- **Daily forecasts** - 8 days of weather outlook
- **Minute-by-minute** - Precipitation for the next hour (optional)
- **Weather alerts** - Government warnings in real-time

### Subscription

One Call API 3.0 uses a "pay-as-you-call" model:
- **Free tier**: 1,000 calls/day
- Subscribe to "One Call by Call" in your OpenWeatherMap account
- [Learn more](https://openweathermap.org/api/one-call-3)

**Note**: The app automatically falls back to standard APIs if One Call 3.0 is not available.

## 🐛 Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you encounter any issues, please open an issue on [GitHub](https://github.com/Dizay1957/Weather-app/issues).

---

Made with ❤️ using Next.js and OpenWeatherMap API
