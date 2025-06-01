'use server'

import axios from 'axios';

import { getSessionToken } from '@/lib/getSessionToken';

export const getLaboratoryById = async (laboratoryId) => {
    'use server'

    const token = await getSessionToken();

    if (!token) {
        return {
            success: false,
            status: 401,
            payload: "Nu sunteti autentificat"
        };
    }

    try {
        const response = await axios.get(`${process.env.BACKEND_URI}/laboratories/${laboratoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: (status) => {
                return status === 200 || status === 401 || status === 403 || status === 500;
            }
        });

        if (response.status === 401) {
            return {
                success: false,
                status: 401,
                payload: "Sesiune expirata. Reautentificati-va"
            };
        }

        if (response.status === 403) {
            return {
                success: false,
                status: 403,
                payload: "Nu aveti permisiuni pentru aceasta operatiune"
            };
        }

        if (response.status === 500) {
            return {
                success: false,
                status: 500,
                payload: "Eroare interna. Incercati mai tarziu"
            };
        }

        return {
            success: true,
            status: response.status || 200,
            payload: response.data
        };

    } catch (error) {
        console.error("getLaboratoryById error:", error);
        return {
            success: false,
            status: error.response?.status || 500,
            payload: error.response?.data?.error || 'An error occurred while fetching laboratory data'
        };
    }


}