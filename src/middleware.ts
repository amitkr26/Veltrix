import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/create', '/studio', '/profile'];
// Routes that are only for non-authenticated users
const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // We check for a session cookie (Simulation for production readiness)
  // In a real Appwrite SSR setup, this would check for 'a_session_<id>'
  const hasSession = request.cookies.get('auth-storage'); // This matches our Zustand persist key in local storage if mirrored

  if (protectedRoutes.some(route => pathname.startsWith(route)) && !hasSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authRoutes.some(route => pathname.startsWith(route)) && hasSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
