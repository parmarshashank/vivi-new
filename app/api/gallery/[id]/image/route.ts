import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const item = await Gallery.findById(params.id);
    
    if (!item) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    // Return the image path
    return NextResponse.json({ imagePath: item.image });
  } catch (error: unknown) {
    console.error('Error fetching gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery image' },
      { status: 500 }
    );
  }
} 