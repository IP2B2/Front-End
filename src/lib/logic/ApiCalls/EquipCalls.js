


import axios from 'axios';
import { useRouter } from 'next/router';

export async function getEquipmentList() {
    'use client'
    var resolution = {
        status: 0, error: false, payload: '', expiredToken: false
    }
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const token = localStorage.getItem('authToken');
        if (!token) {
            resolution.error = true;
            resolution.payload = "Token not found. Please log in again.";
            resolution.expiredToken = true;
            return resolution;
        }
        const response2 = await axios.get('/api/home/echipamente', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        resolution.status = response2.status;
        resolution.payload = response2.data["_embedded"]["equipments"];
        console.log(response2.data);
        return resolution
    } catch (error) {
        console.error('Error during the request:', error);
        resolution.error = true;
        resolution.payload = "Eroare interna. Incercati mai tarziu";
        return resolution;
    }
}