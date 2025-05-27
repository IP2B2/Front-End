


import axios from 'axios';

export async function getEquipmentList() {
    'use client'
    var resolution = {
        status: 0, error: false, payload: '', expiredToken: false
    }
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            resolution.error = true;
            resolution.payload = "Token not found. Please log in again.";
            resolution.expiredToken = true;
            return resolution;
        }

        const response = await axios.get('/api/home/echipamente', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        resolution.status = response.status;
        resolution.payload = response.data;
        console.log(response.data);
        return resolution;
    } catch (error) {
        console.log('Error during the request:', error);
        resolution.error = true;
        if (error.response) {
            resolution.payload = error.response.data || "Eroare interna. Incercati mai tarziu";
            resolution.status = error.response.status;
        } else {
            resolution.payload = "Eroare de retea sau server indisponibil.";
            resolution.status = 500;
        }
        return resolution;
    }
}