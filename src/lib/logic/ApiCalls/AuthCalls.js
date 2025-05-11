
import axios from "axios";



export async function AuthLogin(email, password) {
    'use client'
    var resolution = {
        status: 0, error: false, payload: ''
    }
    try {
        const response = await axios.post('/api/auth/login', {
            email: email,
            password: password,
        }, {
            validateStatus: statusCode => {
                resolution.status = statusCode;
                return statusCode === 200;
            }
        });
        if (response.status === 200) {
            resolution.payload = response.data?.token;
        }
    } catch (error) {
        resolution.error = true;
        if(error.response.status == 401) {
            resolution.payload = "Email sau parola invalida.";
        } else resolution.payload = "Eroare interna. Incercati mai tarziu";
    }
    return resolution;
}