//  Correct unified import
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Explicit map definition matching your 4-user tag system requirements
const ROLE_PERMISSIONS: Record<number, string[]> = {
  1: ['/dashboard', '/vehicles', '/drivers'],           // Fleet Manager
  2: ['/dashboard', '/vehicles', '/drivers'],           // Driver / Dispatcher
  3: ['/dashboard', '/drivers'],                       // Safety Officer
  4: ['/dashboard', '/vehicles', '/reports'],          // Financial Analyst
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip assets and internal files
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Extract the user tag identity cookie
  const userTagCookie = request.cookies.get('user_tag')?.value;
  const userTag = userTagCookie ? parseInt(userTagCookie, 10) : null;

  // 3. Handle unauthenticated public routes safety window
  if (!userTag) {
    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // Prevent authenticated users from going back to login
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 4. Evaluate RBAC path restrictions
  const allowedPaths = ROLE_PERMISSIONS[userTag] || [];
  const hasAccess = allowedPaths.some(path => pathname.startsWith(path));

  if (!hasAccess && pathname !== '/unauthorized') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // 5. Data Fetch Orchestration: Inject headers for backend API usage tracking
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-tag', String(userTag));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Optimization matcher window block
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};