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
    return NextResponse.json(
      { error: 'Error fetching locations' },
      { status: 500 }
    );
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
    return NextResponse.json(
      { error: 'Error creating location' },
      { status: 500 }
    );
  }
}

