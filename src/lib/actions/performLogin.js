'use server'

import axios from 'axios';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

/**
 * Performs login directly to backend.
 * @param {string} email 
 * @param {string} password 
 * @return {Promise<{success: boolean, status: number|string, payload: string}>} Returns an object with success status, HTTP status code, and payload as token or error message.
 */

export const performLogin = async (email, password) => {
    'use server'
    try {
        const response = await axios(process.env.SETDEV ? process.env.BACKEND_URI + '/auth/login' : '/backend-api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: email,
                password: password
            },
            validateStatus: (status) => {
                return status === 200 || status === 401 || status === 500;
            }
        });
        if(response.status === 401) {
            return {
                success: false,
                status: 401,
                payload: "Credentiale incorecte"
            };
        }
        if(response.status === 500) {
            return {
                success: false,
                status: 500,
                payload: "Eroare interna. Incercati mai tarziu"
            };
        }
        if(!response.data || !response.data.token) {
            return {
                success: false,
                status: 500,
                payload: "Raspuns neasteptat de la server. Incercati mai tarziu"
            };
        }

        const cookieStore = await cookies();
        cookieStore.set({
            name: 'session',
            value: response.data.token,
            maxAge: 60 * 60 * 10, // 10 ore
            path: '/'
        });

        return {
            success: true,
            status: response.status || 200,
            payload: {
                token: response.data.token,
                roles: response.data.roles || []
            }
        }
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            status: error.response?.status || 500,
            payload: error.response?.data?.error || "An unexpected error occurred"
        };
    }

}