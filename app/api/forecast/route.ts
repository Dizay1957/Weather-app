import { NextRequest, NextResponse } from 'next/server';
import { getForecast } from '@/lib/weather';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { error: 'City required' },
      { status: 400 }
    );
  }

  try {
    const forecastData = await getForecast(city);
    return NextResponse.json(forecastData);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}

