import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/login') || pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  const role = parseInt(req.cookies.get('user_tag')?.value || '', 10);
  if (isNaN(role) || role < 1 || role > 4) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Dashboard is open to all roles
  if (pathname.startsWith('/dashboard')) {
    const res = NextResponse.next();
    res.headers.set('x-user-tag', role.toString());
    return res;
  }

  let allowed = false;

  // Fleet Matrix (/vehicles, /maintenance) -> Role 1 (Full), Roles 2 & 4 (View), Role 3 (-)
  if (pathname.startsWith('/vehicles') || pathname.startsWith('/maintenance')) {
    allowed = role === 1 || role === 2 || role === 4;
  }
  // Drivers Matrix (/drivers) -> Roles 1 & 3 (Full), Roles 2 & 4 (-)
  else if (pathname.startsWith('/drivers')) {
    allowed = role === 1 || role === 3;
  }
  // Trips Matrix (/trips) -> Role 2 (Full), Role 3 (View), Roles 1 & 4 (-)
  else if (pathname.startsWith('/trips')) {
    allowed = role === 2 || role === 3;
  }
  // Fuel / Expenses (/expenses) -> Role 4 (Full), Roles 1, 2 & 3 (-)
  else if (pathname.startsWith('/expenses')) {
    allowed = role === 4;
  }
  // Analytics / Reports (/reports) -> Roles 1 & 4 (Full), Roles 2 & 3 (-)
  else if (pathname.startsWith('/reports')) {
    allowed = role === 1 || role === 4;
  }

  if (!allowed) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  const res = NextResponse.next();
  res.headers.set('x-user-tag', role.toString());
  return res;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};