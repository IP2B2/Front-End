'use client'

export function getAuthToken() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error("No auth token found in localStorage");
        }
        return token;
    } catch (error) {
        console.error("Error retrieving auth token:", error);
        throw error;
    }
}