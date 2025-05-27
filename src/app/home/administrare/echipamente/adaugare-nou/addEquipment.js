'use server'
import axios from 'axios';

export async function addEquipment(data) {
    try {
            let newBody = {...data};
        delete newBody.token;
        const response = await axios.post(process.env.BACKEND_URI + `/equipment`, newBody, {
            headers: {
                Authorization: `Bearer ${data.token}` // Assuming token is part of data
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            throw new Error(`Error: ${error.response.data.message ||    'Unknown error'}`);
        } else {
            throw new Error('Network error or server not reachable');
        }
    }
  }