'use server';

import axios from "axios";

/**
 * 
 * @param {string} email 
 * @param {string} matricol 
 */
export const performInitialRegister = async (email, nrMarca) => {
    'use server'
    try {
        const response = await axios(process.env.BACKEND_URI + '/auth/initial-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                email: email,
                nrMarca: nrMarca
            },
            validateStatus: (status) => {
                return status === 200 || status === 400 || status === 500;
            }
        });

        if(response.status === 400) {
            return {
                success: false,
                status: 400,
                payload: "Datele introduse nu sunt valide"
            };
        }
        if(response.status === 500) {
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
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            payload: "Eroare de retea. Incercati mai tarziu"
        };
    }

}