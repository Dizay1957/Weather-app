import { NextRequest, NextResponse } from 'next/server';
import { getCurrentWeather, getWeatherByCoords } from '@/lib/weather';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  try {
    let weatherData;
    
    if (city) {
      weatherData = await getCurrentWeather(city);
    } else if (lat && lon) {
      weatherData = await getWeatherByCoords(parseFloat(lat), parseFloat(lon));
    } else {
      return NextResponse.json(
        { error: 'City or coordinates required' },
        { status: 400 }
      );
    }

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Server error';
    const statusCode = errorMessage.includes('API key') || errorMessage.includes('Invalid API') || errorMessage.includes('401') ? 401 : 500;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}

