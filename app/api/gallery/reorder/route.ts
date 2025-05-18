import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { withAuth } from '@/middleware/auth';

export const POST = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();
    const { items } = await request.json();

    // items should be an array of { id, order }
    if (!Array.isArray(items)) {
      return NextResponse.json(
        { message: 'Invalid input format' },
        { status: 400 }
      );
    }

    // Update each item's order
    const updatePromises = items.map(({ id, order }) =>
      Gallery.findByIdAndUpdate(id, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    const updatedItems = await Gallery.find().sort({ order: 1 });
    return NextResponse.json(updatedItems);
  } catch (error) {
    console.error('Gallery reorder error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}); 