import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/create', '/studio', '/profile'];
// Routes that are only for non-authenticated users
const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // High-reliability session check for Next.js Middleware
  const hasSession = request.cookies.get('veltrix_session');

  if (protectedRoutes.some(route => pathname.startsWith(route)) && !hasSession) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (authRoutes.some(route => pathname.startsWith(route)) && hasSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
