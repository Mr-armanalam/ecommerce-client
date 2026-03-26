// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy (req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;

  if (!isAuthenticated && !req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/cart/:path*',
    '/products/:id*',
    '/account/:id*',
    '/wishlist/:id*',
    '/categories/:id*',
  ],
};
