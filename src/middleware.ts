import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {  
  console.log(request.nextUrl.pathname)
  const currentUser = request.cookies.get('currentUser')?.value
 
  if (currentUser && !request.nextUrl.pathname.startsWith('/treatment')) {    
    return Response.redirect(new URL('/treatment', request.url))
  }
 
  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    const url = new URL('/treatment', request.url)    
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}