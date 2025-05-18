import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jwt from 'jsonwebtoken';

export async function authMiddleware(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: 'Authentication required' }),
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Invalid token' }),
      { status: 401 }
    );
  }
}

export function withAuth(handler: Function) {
  return async function(req: NextRequest, ...args: any[]) {
    const authResult = await authMiddleware(req);
    
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    
    return handler(req, ...args);
  }
} 