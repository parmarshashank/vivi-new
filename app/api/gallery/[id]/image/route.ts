import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    
    const item = await Gallery.findById(id);
    if (!item || !item.image) {
      return NextResponse.json(
        { message: 'Image not found' },
        { status: 404 }
      );
    }

    const response = new NextResponse(item.image.data);
    response.headers.set('Content-Type', item.image.contentType);
    return response;
  } catch (error) {
    console.error('Gallery image GET error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 