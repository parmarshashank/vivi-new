import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/models/Team';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    
    const member = await Team.findById(id);
    if (!member || !member.image) {
      return NextResponse.json(
        { message: 'Image not found' },
        { status: 404 }
      );
    }

    const response = new NextResponse(member.image.data);
    response.headers.set('Content-Type', member.image.contentType);
    return response;
  } catch (error) {
    console.error('Team image GET error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 