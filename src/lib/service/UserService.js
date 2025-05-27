'use server'
import axios from 'axios';


export async function getAllUsers(authToken) {
    if (!authToken) {
        throw new Error("authToken is required");
    }

    try {
        const response = await axios.get(`${process.env.BACKEND_URI}/users`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data._embedded.users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
