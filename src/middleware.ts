import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  // Check if accessing protected routes
  if (request.nextUrl.pathname.startsWith('/chat')) {
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/chat/:path*']
};