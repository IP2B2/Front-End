import { NextResponse } from 'next/server';

import { jwtDecode } from 'jwt-decode';

export async function middleware(request) {

    if(request.nextUrl.pathname === '/') {
        return NextResponse.next();
    }

    const jwtCookie = request.cookies.get('session');
    const jwtDecoded = jwtCookie ? jwtDecode(jwtCookie.value) : null;

    let session = null;

    if (!jwtDecoded || !jwtDecoded.exp || jwtDecoded.exp * 1000 < Date.now()) {
        session = {
            isAuth: false,
            username: null,
            roles: []
        };
    } else session = {
        isAuth: true,
        username: jwtDecoded?.sub || null,
        roles: jwtDecoded?.roles || []
    };

    if(request.nextUrl.pathname.startsWith('/auth')) {
        if (session && session.isAuth) {
            return NextResponse.redirect(new URL('/home', request.url));
        }
        return NextResponse.next();
    }

    if(request.nextUrl.pathname.startsWith('/home/administrare')) {
        if (!session || !session.isAuth || !session.roles.includes('ADMIN')) {
            if(session && session.isAuth) {
                return NextResponse.redirect(new URL('/home', request.url));
            }
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next();
    }

    if(request.nextUrl.pathname.startsWith('/home/coordonator/')) {
        if (!session || !session.isAuth || !session.roles.includes('COORDONATOR')) {
            if(session && session.isAuth) {
                return NextResponse.redirect(new URL('/home', request.url));
            }
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith('/home')) {
        if (!session || !session.isAuth) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next();
    }

}