import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return NextResponse.json(locations);
  } catch (error) {
    // Database might not be available (e.g., on Vercel with SQLite)
    // Return empty array instead of error to allow app to work
    console.warn('Database not available, returning empty locations:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, latitude, longitude } = body;

    if (!name || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: 'Name, latitude and longitude required' },
        { status: 400 }
      );
    }

    const location = await prisma.location.create({
      data: {
        name,
        latitude,
        longitude,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    // Database might not be available (e.g., on Vercel with SQLite)
    // Return success anyway since location saving is optional
    console.warn('Database not available, location not saved:', error);
    return NextResponse.json(
      { 
        id: Date.now(),
        name,
        latitude,
        longitude,
        createdAt: new Date(),
        updatedAt: new Date(),
        _note: 'Location not persisted (database unavailable)'
      },
      { status: 200 }
    );
  }
}

