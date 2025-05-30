
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
        console.log("Login response:", response);
        if (response.status === 200) {
            resolution.payload = {
                token: response.data?.token,
                roles: response.data?.roles || []
            };
        }
    } catch (error) {
        console.error("Authentication error:", error);
        resolution.error = true;
        if(error.response.status == 401) {
            resolution.payload = "Email sau parola invalida.";
        } else resolution.payload = "Eroare interna. Incercati mai tarziu";
    }
    return resolution;
}

export async function AuthCheckTokenUser(authToken) {
    'use client'
    var resolution = {
        status: 0, error: false, payload: ''
    }
    try {
        const response = await axios.get('/api/auth/check-auth-student', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        resolution.status = response.status;
        if (response.status === 200) {
            resolution.payload = response.data;
        }
    } catch (error) {
        resolution.error = true;
        resolution.status = error.response.status;
        if(error.response.status == 401) {
            resolution.payload = "Token invalid.";
        } else resolution.payload = "Eroare interna. Incercati mai tarziu";
    }
    return resolution;
}

export function AuthGetRoles() {
    'use client'
    var resolution = {
        status: 0, error: false, payload: ''
    }
    const userRoles = localStorage.getItem('userRoles');
    if(!userRoles) {
        resolution.error = true;
        resolution.payload = "User roles not found.";
        return resolution;
    }
    resolution.payload = JSON.parse(userRoles);
    resolution.status = 200;
    return resolution;
}