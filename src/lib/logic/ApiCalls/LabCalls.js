
import axios from 'axios';

export async function getLabs() {
    'use client'
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const token = localStorage.getItem('authToken');

        const response2 = await axios.get('https://88.80.135.141/api/laboratories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response2.data);
        return response2.data;
    } catch (error) {
        console.error('Error during the request:', error);
        throw error;
    }
}