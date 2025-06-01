'use server'

import axios from 'axios';

import { getSessionToken } from "@/lib/getSessionToken";
import { jwtDecode } from 'jwt-decode';

export const getAllUsers = async () => {
    'use server';
    try {
        const token = await getSessionToken();
        console.log("Token for getAllUsers:", token);

        if (!token) {
            return {
                success: false,
                status: 401,
                payload: "Nu sunteti autentificat"
            };
        }

        const response = await axios.get(process.env.BACKEND_URI + '/users', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            params: {
                'size': 1000,
            },
            validateStatus: (status) => {
                return status === 200 || status === 401 || status === 403 || status === 500;
            }
        });
        console.log("Response from getAllUsers:", response);

        if (response.status === 401) {
            return {
                success: false,
                status: 401,
                payload: "Sesiune expirata. Reautentificati-va"
            };
        }

        if (response.status === 403) {
            return {
                success: false,
                status: 403,
                payload: "Nu aveti permisiuni pentru aceasta operatiune"
            };
        }

        if (response.status === 500) {
            return {
                success: false,
                status: 500,
                payload: "Eroare interna. Incercati mai tarziu"
            };
        }

        let users = response.data._embedded.users.map(user => ({
            ...user,
            id: user._links.self.href.split('/').pop(),
        }));
        return {
            success: true,
            status: response.status,
            payload: users
        };
    } catch (error) {
        console.error("Error getAllUsers:", error.response);
        return {
            success: false,
            status: error.response?.status || 500,
            payload: error.response?.data?.error || "An error occurred while fetching users."
        }
    }

}

export const getUserById = async (userId) => {

}

export const serviceApproveUser = async (userId) => {
    'use server';
    try {
        const token = await getSessionToken();
        console.log("Token for serviceApproveUser:", token);

        if (!token) {
            return {
                success: false,
                status: 401,
                payload: "Nu sunteti autentificat"
            };
        }

        const response = await axios.put(process.env.BACKEND_URI + `/users/${userId}/approve`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            validateStatus: (status) => {
                return status === 200 || status === 400 || status === 401 || status === 403 || status === 500;
            }
        });
        console.log("Response from serviceApproveUser:", response);

        if (response.status === 400) {
            return {
                success: false,
                status: 400,
                payload: response.data
            };
        }

        if (response.status === 401) {
            return {
                success: false,
                status: 401,
                payload: "Sesiune expirata. Reautentificati-va"
            };
        }

        if (response.status === 403) {
            return {
                success: false,
                status: 403,
                payload: "Nu aveti permisiuni pentru aceasta operatiune"
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
            status: response.status,
            payload: response.data
        };
    } catch (error) {
        console.error("Error serviceApproveUser:", error);
        return {
            success: false,
            status: error.response?.status || 500,
            payload: error.response?.data?.error || "An error occurred while approving user."
        }
    }
}

// export const serviceRejectUser = async (userId) => {}

export const serviceGetMyUser = async () => {
    'use server';
    try {
        const token = await getSessionToken();
        console.log("Token for serviceGetMyUser:", token);
        if (!token) {
            return {
                success: false,
                status: 401,
                payload: "Nu sunteti autentificat"
            };
        }
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;

        const usersResolution = await getAllUsers();
        if (!usersResolution.success) {
            return {
                success: false,
                status: usersResolution.status,
                payload: usersResolution.payload
            };
        }
        const user = usersResolution.payload.find(user => user.username === username);
        if (!user) {
            return {
                success: false,
                status: 404,
                payload: "User not found"
            };
        }
        return {
            success: true,
            status: 200,
            payload: user
        };
    } catch (error) {
        console.error("Error serviceGetMyUser:", error);
        return {
            success: false,
            status: error.response?.status || 500,
            payload: error.response?.data?.error || "An error occurred while fetching user."
        };
    }
}

export const deleteUser = async (userId) => {
    'use server';
    try {
        const token = await getSessionToken();
        console.log("Token for deleteUser:", token);

        if (!token) {
            return {
                success: false,
                status: 401,
                payload: "Nu sunteti autentificat"
            };
        }

        const response = await axios.delete(process.env.BACKEND_URI + `/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            validateStatus: (status) => {
                return status === 200 || status === 204 || status === 400 || status === 401 || status === 403 || status === 500;
            }
        });
        console.log("Response from deleteUser:", response);

        if (response.status === 400) {
            return {
                success: false,
                status: 400,
                payload: response.data
            };
        }

        if (response.status === 401) {
            return {
                success: false,
                status: 401,
                payload: "Sesiune expirata. Reautentificati-va"
            };
        }

        if (response.status === 403) {
            return {
                success: false,
                status: 403,
                payload: "Nu aveti permisiuni pentru aceasta operatiune"
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
            status: response.status,
            payload: "User deleted successfully"
        };
    } catch (error) {
        console.error("Error deleteUser:", error);
        return {
            success: false,
            status: error.response?.status || 500,
            payload: error.response?.data?.error || "An error occurred while deleting user."
        }
    }
};

