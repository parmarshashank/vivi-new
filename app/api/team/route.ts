import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/models/Team';
import { withAuth } from '@/middleware/auth';
import { writeFile } from 'fs/promises';
import path from 'path';

// Get all team members
export async function GET() {
  try {
    await connectDB();
    const members = await Team.find().sort({ order: 1 }).select('-image.data');
    return NextResponse.json(members);
  } catch (error: unknown) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

// Create new team member
export const POST = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;
    const linkedin = formData.get('linkedin') as string;
    const twitter = formData.get('twitter') as string;
    const github = formData.get('github') as string;
    
    if (!name || !role || !description || !imageFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save image to public directory
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imagePath = `/uploads/team/${Date.now()}-${imageFile.name}`;
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    await writeFile(fullPath, buffer);

    // Get the highest order number and add 1
    const highestOrder = await Team.findOne().sort({ order: -1 });
    const newOrder = (highestOrder?.order || 0) + 1;
    
    const newMember = await Team.create({
      name,
      role,
      description,
      image: imagePath,
      socialLinks: {
        linkedin,
        twitter,
        github,
      },
      order: newOrder,
    });

    const memberWithoutImage = { ...newMember.toObject(), image: undefined };
    return NextResponse.json(memberWithoutImage, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
});

// Update team member
export const PUT = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;
    const linkedin = formData.get('linkedin') as string;
    const twitter = formData.get('twitter') as string;
    const github = formData.get('github') as string;
    
    if (!id || !name || !role || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updateData: {
      name: string;
      role: string;
      description: string;
      image?: string;
      socialLinks: {
        linkedin: string;
        twitter: string;
        github: string;
      };
    } = {
      name,
      role,
      description,
      socialLinks: {
        linkedin,
        twitter,
        github,
      },
    };

    if (imageFile) {
      // Save new image
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imagePath = `/uploads/team/${Date.now()}-${imageFile.name}`;
      const fullPath = path.join(process.cwd(), 'public', imagePath);
      await writeFile(fullPath, buffer);
      updateData.image = imagePath;
    }
    
    const updatedMember = await Team.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-image.data');
    
    if (!updatedMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedMember);
  } catch (error: unknown) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
});

// Delete team member
export const DELETE = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing team member ID' },
        { status: 400 }
      );
    }

    const deletedMember = await Team.findByIdAndDelete(id);
    
    if (!deletedMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    // Reorder remaining members
    const remainingMembers = await Team.find({ order: { $gt: deletedMember.order } });
    for (const member of remainingMembers) {
      await Team.findByIdAndUpdate(member._id, { order: member.order - 1 });
    }
    
    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}); 