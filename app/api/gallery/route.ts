import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { withAuth } from '@/middleware/auth';
import { writeFile } from 'fs/promises';
import path from 'path';

// Get all gallery items
export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find().sort({ order: 1 }).select('-image.data');
    return NextResponse.json(items);
  } catch (error: unknown) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
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
    const image = formData.get('image') as File;
    
    if (!title || !description || !image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save image to public directory
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imagePath = `/uploads/gallery/${Date.now()}-${image.name}`;
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    await writeFile(fullPath, buffer);

    // Create gallery item
    const item = await Gallery.create({
      title,
      description,
      image: imagePath,
      order: await Gallery.countDocuments(),
    });

    return NextResponse.json(item);
  } catch (error: unknown) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
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
    const image = formData.get('image') as File | null;
    
    if (!id || !title || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updateData: { title: string; description: string; image?: string } = {
      title,
      description,
    };

    if (image) {
      // Save new image
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imagePath = `/uploads/gallery/${Date.now()}-${image.name}`;
      const fullPath = path.join(process.cwd(), 'public', imagePath);
      await writeFile(fullPath, buffer);
      updateData.image = imagePath;
    }
    
    const item = await Gallery.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-image.data');
    
    if (!item) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(item);
  } catch (error: unknown) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to update gallery item' },
      { status: 500 }
    );
  }
});

// Delete gallery item
export const DELETE = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing gallery item ID' },
        { status: 400 }
      );
    }

    const item = await Gallery.findByIdAndDelete(id);
    
    if (!item) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Gallery item deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
}); 