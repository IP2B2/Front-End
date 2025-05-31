'use server'

import { cookies } from 'next/headers';

export async function getSessionToken() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');
        return sessionCookie?.value || null;
    } catch (error) {
        console.error("Error retrieving session token:", error);
        return null;
    }
} 