'use server'

import { getSessionToken } from '@/lib/getSessionToken';
import axios from 'axios';

export const getEquipments = async () => {
    'use server'
    try {
        const token = await getSessionToken();
        
        if (!token) {
            return {
                success: false,
                status: 401,
                payload: "Nu sunteti autentificat"
            };
        }

        const response = await axios.get(process.env.BACKEND_URI + '/equipment', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            validateStatus: (status) => {
                return status === 200 || status === 401 || status === 403 || status === 500;
            }
        });

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
            status: response.status || 200,
            payload: response.data
        };

    } catch (error) {
        console.error("Get equipments error:", error);
        return {
            success: false,
            status: error.response?.status || 500,
            payload: error.response?.data?.error || "A aparut o eroare neasteptata"
        };
    }
};

export const getEquipmentById = async (equipmentId) => {
    'use server'
    try {
        if (!equipmentId) {
            return {
                success: false,
                status: 400,
                payload: "ID echipament este necesar"
            };
        }

        const token = await getSessionToken();
        
        if (!token) {
            return {
                success: false,
                status: 401,
                payload: "Nu sunteti autentificat"
            };
        }

        const response = await axios.get(process.env.BACKEND_URI + `/equipment/${equipmentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            validateStatus: (status) => {
                return status === 200 || status === 401 || status === 403 || status === 404 || status === 500;
            }
        });

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

        if (response.status === 404) {
            return {
                success: false,
                status: 404,
                payload: "Echipamentul nu a fost gasit"
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
        console.error("Get equipment by ID error:", error);
        return {
            success: false,
            status: error.response?.status || 500,
            payload: error.response?.data?.error || "A aparut o eroare neasteptata"
        };
    }
};

export const createEquipment = async (equipmentData) => {
    'use server'
    try {
        if (!equipmentData) {
            return {
                success: false,
                status: 400,
                payload: "Datele echipamentului sunt necesare"
            };
        }

        const token = await getSessionToken();
        
        if (!token) {
            return {
                success: false,
                status: 401,
                payload: "Nu sunteti autentificat"
            };
        }

        const { id, ...dataToSend } = equipmentData;

        const response = await axios.post(process.env.BACKEND_URI + '/equipment', dataToSend, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            validateStatus: (status) => {
                return status === 200 || status === 201 || status === 400 || status === 401 || status === 403 || status === 500;
            }
        });

        if (response.status === 400) {
            return {
                success: false,
                status: 400,
                payload: "Date invalide pentru echipament"
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
            status: response.status || 201,
            payload: response.data
        };

    } catch (error) {
        console.error("Create equipment error:", error);
        return {
            success: false,
            status: error.response?.status || 500,
            payload: error.response?.data?.error || "A aparut o eroare neasteptata"
        };
    }
};

export const updateEquipment = async (equipmentId, equipmentData) => {
    'use server'
    try {
        if (!equipmentId) {
            return {
                success: false,
                status: 400,
                payload: "ID echipament este necesar"
            };
        }

        if (!equipmentData) {
            return {
                success: false,
                status: 400,
                payload: "Datele echipamentului sunt necesare"
            };
        }

        const token = await getSessionToken();
        
        if (!token) {
            return {
                success: false,
                status: 401,
                payload: "Nu sunteti autentificat"
            };
        }

        const response = await axios.put(process.env.BACKEND_URI + `/equipment/${equipmentId}`, equipmentData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            validateStatus: (status) => {
                return status === 200 || status === 400 || status === 401 || status === 403 || status === 404 || status === 500;
            }
        });

        console.log(response.data);

        if (response.status === 400) {
            return {
                success: false,
                status: 400,
                payload: "Date invalide pentru echipament"
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

        if (response.status === 404) {
            return {
                success: false,
                status: 404,
                payload: "Echipamentul nu a fost gasit"
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
        console.error("Update equipment error:", error);
        return {
            success: false,
            status: error.response?.status || 500,
            payload: error.response?.data?.error || "A aparut o eroare neasteptata"
        };
    }
};

export const deleteEquipment = async (equipmentId) => {
    'use server'
    try {
        if (!equipmentId) {
            return {
                success: false,
                status: 400,
                payload: "ID echipament este necesar"
            };
        }

        const token = await getSessionToken();
        
        if (!token) {
            return {
                success: false,
                status: 401,
                payload: "Nu sunteti autentificat"
            };
        }

        const response = await axios.delete(process.env.BACKEND_URI + `/equipment/${equipmentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            validateStatus: (status) => {
                return status === 200 || status === 204 || status === 401 || status === 403 || status === 404 || status === 500;
            }
        });

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

        if (response.status === 404) {
            return {
                success: false,
                status: 404,
                payload: "Echipamentul nu a fost gasit"
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
            status: response.status || 204,
            payload: "Echipament sters cu succes"
        };

    } catch (error) {
        console.error("Delete equipment error:", error);
        return {
            success: false,
            status: error.response?.status || 500,
            payload: error.response?.data?.error || "A aparut o eroare neasteptata"
        };
    }
}; 