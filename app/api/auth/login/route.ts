import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  console.log('Login API route hit');
  
  try {
    const body = await request.json();
    console.log('Request body received:', { username: body.username, hasPassword: !!body.password });

    const { username, password } = body;

    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
      console.error('Missing environment variables:', {
        hasUsername: !!process.env.ADMIN_USERNAME,
        hasPassword: !!process.env.ADMIN_PASSWORD,
        hasJwtSecret: !!process.env.JWT_SECRET
      });
      throw new Error('Required environment variables are not defined');
    }

    console.log('Comparing credentials:', {
      providedUsername: username,
      expectedUsername: process.env.ADMIN_USERNAME,
      passwordsMatch: password === process.env.ADMIN_PASSWORD
    });

    // Direct string comparison for both username and password
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      console.log('Authentication failed - Invalid credentials');
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Authentication successful - Generating token');
    const token = jwt.sign(
      { username: process.env.ADMIN_USERNAME },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Token generated successfully');
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 