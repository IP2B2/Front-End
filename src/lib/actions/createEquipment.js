'use server'

import axios from 'axios';



export const createEquipment = async (authToken, equipmentData) => {
    'use server'
    try {
        const response = await axios(process.env.BACKEND_URI + '/equipment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            data: equipmentData,
            validateStatus: (status) => {
                return status === 200 || status === 400 || status === 500;
            }
        });
        console.log("createEquipment response.data:", response.data);
        if (response.status === 400) {
            return {
                success: false,
                status: 400,
                payload: "Datele echipamentului sunt incomplete sau incorecte"
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
        console.error("Create equipment error:", error);
        return {
            success: false,
            status: 500,
            payload: "Eroare la crearea echipamentului. Incercati mai tarziu"
        };
    }
}