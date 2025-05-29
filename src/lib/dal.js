import 'server-only';
import { cache } from 'react';

import { cookies } from 'next/headers';

import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value;
    if (!cookie) {
        redirect('/auth/login');
    }

    const decoded = jwtDecode(cookie);
    if (!decoded || !decoded.exp || decoded.exp * 1000 < Date.now()) {
        redirect('/auth/login');
    }
    if(!decoded?.sub) {
        redirect('/auth/login');
    }

    return {
        isAuth: true,
        username: decoded?.sub,
        roles: decoded?.roles || [],
    }
});