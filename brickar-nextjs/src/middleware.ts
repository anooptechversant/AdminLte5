import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token');

  //   if (!token && req.nextUrl.pathname !== "/login") {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
