import { NextResponse, type NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  console.log('Middleware running. Access token:', accessToken);
  console.log('Pathname:', request.nextUrl.pathname);

  // if (accessToken && request.nextUrl.pathname === '/login') {
  //   console.log('Redirecting to home');
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // if (!accessToken && request.nextUrl.pathname !== '/login') {
  //   console.log('Redirecting to login');
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
