
import { NextRequest, NextResponse } from 'next/server';


export function middleware(request : NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin')) {
    const isAuthenticated = true;
    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/protection', request.url));
    }
  }
  
  return NextResponse.next();
}
export const config = {
  matcher: ['/admin/:path*'], 
};