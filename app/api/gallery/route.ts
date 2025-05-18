import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { withAuth } from '@/middleware/auth';

// Get all gallery items
export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find().sort({ order: 1 }).select('-image.data');
    return NextResponse.json(items);
  } catch (error) {
    console.error('Gallery GET error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create new gallery item
export const POST = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;
    
    if (!title || !description || !imageFile) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const imageBuffer = await imageFile.arrayBuffer();
    
    // Get the highest order number and add 1
    const highestOrder = await Gallery.findOne().sort({ order: -1 });
    const newOrder = (highestOrder?.order || 0) + 1;
    
    const newItem = await Gallery.create({
      title,
      description,
      image: {
        data: Buffer.from(imageBuffer),
        contentType: imageFile.type,
      },
      order: newOrder,
    });

    const itemWithoutImage = { ...newItem.toObject(), image: undefined };
    return NextResponse.json(itemWithoutImage, { status: 201 });
  } catch (error) {
    console.error('Gallery POST error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
});

// Update gallery item
export const PUT = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;
    
    const updateData: any = {
      title,
      description,
    };

    if (imageFile) {
      const imageBuffer = await imageFile.arrayBuffer();
      updateData.image = {
        data: Buffer.from(imageBuffer),
        contentType: imageFile.type,
      };
    }
    
    const updatedItem = await Gallery.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-image.data');
    
    if (!updatedItem) {
      return NextResponse.json(
        { message: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Gallery PUT error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
});

// Delete gallery item
export const DELETE = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();
    const { id } = await request.json();
    
    const deletedItem = await Gallery.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return NextResponse.json(
        { message: 'Item not found' },
        { status: 404 }
      );
    }
    
    // Reorder remaining items
    const remainingItems = await Gallery.find({ order: { $gt: deletedItem.order } });
    for (const item of remainingItems) {
      await Gallery.findByIdAndUpdate(item._id, { order: item.order - 1 });
    }
    
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Gallery DELETE error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}); 