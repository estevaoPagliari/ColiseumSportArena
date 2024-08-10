import { NextResponse, type NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const tokenadmin = request.cookies.get('tokenadmin')?.value
  const tokenuser = request.cookies.get('tokenclient')?.value
  const pathname = request.nextUrl.pathname

  // Log the tokens for debugging

  if (pathname.startsWith('/admin')) {
    if (!tokenadmin) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } else if (
    pathname.startsWith('/cliente') ||
    pathname.startsWith('/reserva')
  ) {
    if (!tokenuser) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } else if (pathname.startsWith('/historico')) {
    if (!tokenadmin) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } else {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
    '/cliente/:path*',
    '/reserva/:path*',
    '/historico/:path*',
  ],
}
