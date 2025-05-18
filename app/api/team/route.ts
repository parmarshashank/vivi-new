import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/models/Team';
import { withAuth } from '@/middleware/auth';

// Get all team members
export async function GET() {
  try {
    await connectDB();
    const members = await Team.find().sort({ order: 1 }).select('-image.data');
    return NextResponse.json(members);
  } catch (error) {
    console.error('Team GET error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
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
        { message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const imageBuffer = await imageFile.arrayBuffer();
    
    // Get the highest order number and add 1
    const highestOrder = await Team.findOne().sort({ order: -1 });
    const newOrder = (highestOrder?.order || 0) + 1;
    
    const newMember = await Team.create({
      name,
      role,
      description,
      image: {
        data: Buffer.from(imageBuffer),
        contentType: imageFile.type,
      },
      socialLinks: {
        linkedin,
        twitter,
        github,
      },
      order: newOrder,
    });

    const memberWithoutImage = { ...newMember.toObject(), image: undefined };
    return NextResponse.json(memberWithoutImage, { status: 201 });
  } catch (error) {
    console.error('Team POST error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
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
    
    const updateData: any = {
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
      const imageBuffer = await imageFile.arrayBuffer();
      updateData.image = {
        data: Buffer.from(imageBuffer),
        contentType: imageFile.type,
      };
    }
    
    const updatedMember = await Team.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-image.data');
    
    if (!updatedMember) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error('Team PUT error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
});

// Delete team member
export const DELETE = withAuth(async (request: NextRequest) => {
  try {
    await connectDB();
    const { id } = await request.json();
    
    const deletedMember = await Team.findByIdAndDelete(id);
    
    if (!deletedMember) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 }
      );
    }
    
    // Reorder remaining members
    const remainingMembers = await Team.find({ order: { $gt: deletedMember.order } });
    for (const member of remainingMembers) {
      await Team.findByIdAndUpdate(member._id, { order: member.order - 1 });
    }
    
    return NextResponse.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Team DELETE error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}); 