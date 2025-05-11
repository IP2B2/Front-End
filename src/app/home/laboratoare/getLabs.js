'use server'
import axios from 'axios';

export async function getLabs() {
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Ignore self-signed certificate errors
        const response = await axios.post('https://88.80.135.141/api/auth/login', {
            username: 'user1',
            password: 'hashed_pass' // Ensure this is the correct password or replace with the actual hashed password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { token } = response.data;
        const response2 = await axios.get('https://88.80.135.141/api/laboratories/all', {
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