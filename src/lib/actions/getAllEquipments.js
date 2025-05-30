'use server'

import axios from 'axios';


export const equipmentGetAll = async () => {
    'use server'
    try {
        const response = {};
        return {
            success: true,
            status: 200,
            payload: response.data
        };
    } catch (error) {
        console.error("Error fetching all equipments:", error);
        return {
            success: false,
            status: 500,
            payload: "Eroare de retea. Incercati mai tarziu",
            errorPayload: error
        };
    }
}
