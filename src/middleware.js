import { NextRequest, NextResponse } from 'next/server';

import { jwtDecode } from 'jwt-decode';

const homePath = '/home';

/**
 * Middleware function to handle authentication and authorization.
 * @param {NextRequest} request 
 */

export async function middleware(request) {

    console.log("Middleware triggered for request:", request.method, request.nextUrl.pathname);
    const headers = new Headers(request.headers);
    headers.set('x-forwarded-host', request.headers.get('host'));

    console.log("Request xfwd:", headers.get('x-forwarded-host'));
    console.log("Request host:", headers.get('host'));

    if(request.nextUrl.pathname === '/') {
        return NextResponse.next({ request: { headers } });
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
            return NextResponse.redirect(new URL(homePath, request.url));
        }
        return NextResponse.next({ request: { headers } });
    }

    if(request.nextUrl.pathname.startsWith(homePath + '/administrare')) {
        if (!session || !session.isAuth || !session.roles.includes('ADMIN')) {
            if(session && session.isAuth) {
                return NextResponse.redirect(new URL(homePath, request.url));
            }
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next({ request: { headers } });
    }

    if(request.nextUrl.pathname.startsWith(homePath + '/coordonator/')) {
        if (!session || !session.isAuth || !session.roles.includes('COORDONATOR')) {
            if(session && session.isAuth) {
                return NextResponse.redirect(new URL(homePath, request.url));
            }
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next({ request: { headers } });
    }

    if (request.nextUrl.pathname.startsWith(homePath)) {
        if (!session || !session.isAuth) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next({ request: { headers } });
    }

}