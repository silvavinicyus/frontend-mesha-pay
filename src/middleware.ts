import type { NextRequest } from 'next/server'
import { IUserType } from './interfaces/user'
 
export function middleware(request: NextRequest) {    
  const currentUser = 
    request.cookies.get('currentUser')?.value 
      ? JSON.parse(request.cookies.get('currentUser')!.value) 
      : undefined           

  if (currentUser && currentUser['type'] === IUserType.CLIENT && !request.nextUrl.pathname.startsWith('/clients')) {       
    return Response.redirect(new URL('/clients/treatments', request.url))
  }

  if (currentUser && currentUser['type'] === IUserType.DOCTOR && !request.nextUrl.pathname.startsWith('/doctors')) {       
    return Response.redirect(new URL('/doctors/treatments', request.url))
  }
 
  if (!currentUser && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/account/create')) {       
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/\/account\/create$/'],
}