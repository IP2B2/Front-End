'use server'

import axios from 'axios';

import { decodeEquipmentObject, encodeEquipmentObject } from "@/lib/service/EquipmentOps";

import { getAuthToken } from "@/lib/getAuthToken";
/**
 * Gets equipment by ID.
 * @param {string} authToken authToken from localStorage
 * @param {string|number} equipmentId id of the equipment to retrieve
 * @return {Promise<Object>} The decoded equipment object.
 */

export async function getEquipmentById(authToken, equipmentId) {
    console.log("getEquipmentById called with authToken:", authToken, "and equipmentId:", equipmentId);
    if(!authToken || !equipmentId) {
        throw new Error("authToken and equipment ID are required");
    }
    try {
        const response = await axios.get(`${process.env.BACKEND_URI}/equipment/${equipmentId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return decodeEquipmentObject(response.data);
    } catch(error) {
        console.error("Error in getEquipmentById:", error);
        if (error.response) {
            if(error.response.status === 404) {
                return undefined;
            }
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            throw new Error(`Error: ${error.response.data.message || 'Unknown error'}`);
        } else {
            throw new Error('Network error or server not reachable');
        }
    }
}

/**
 * Gets all equipment.
 * @param {*} authToken authToken from localStorage
 * @return {Promise<Array>} An array of decoded equipment objects.
 */

export async function getAllEquipment(authToken) {
    if(!authToken) {
        throw new Error("authToken is required");
    }
    try {
        const response = await axios.get(`${process.env.BACKEND_URI}/equipment`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data.map(item => decodeEquipmentObject(item));
    } catch(error) {
        console.error("Error in getAllEquipment:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            throw new Error(`Error: ${error.response.data.message || 'Unknown error'}`);
        } else {
            throw new Error('Network error or server not reachable');
        }
    }
}

/**
 * Updates equipment by ID.
 * @param {*} authToken authToken from localStorage
 * @param {*} decodedEquipment the decoded equipment object to update with id included
 * @return {Promise<Object>} The updated decoded equipment object.
 */

export async function updateEquipmentById(authToken, decodedEquipment) {
    if(!authToken || !decodedEquipment || !decodedEquipment.id) {
        throw new Error("authToken and decoded equipment with ID are required");
    }
    console.log("updateEquipmentById called with authToken:", authToken, "and decodedEquipment:", decodedEquipment);
    try {
        const encodedEquipment = encodeEquipmentObject(decodedEquipment);
        console.log("encoded equipment:", encodedEquipment);
        const response = await axios.put(`${process.env.BACKEND_URI}/equipment/${encodedEquipment.id}`, encodedEquipment, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return decodeEquipmentObject(response.data);
    } catch(error) {
        console.error("Error in updateEquipmentById:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            throw new Error(`Error: ${error.response.data.message || 'Unknown error'}`);
        } else {
            throw new Error('Network error or server not reachable');
        }
    }
}

/**
 * Deletes equipment by ID.
 * @param {*} authToken authToken from localStorage
 * @param {*} equipmentId id of the equipment to delete
 * @return {Promise<void>} Resolves if deletion is successful.
 */

export async function deleteEquipmentById(authToken, equipmentId) {
    if(!authToken || !equipmentId) {
        throw new Error("authToken and equipment ID are required");
    }
    try {
        await axios.delete(`${process.env.BACKEND_URI}/equipment/${equipmentId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    } catch(error) {
        console.error("Error in deleteEquipmentById:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            throw new Error(`Error: ${error.response.data.message || 'Unknown error'}`);
        } else {
            throw new Error('Network error or server not reachable');
        }
    }
}

/**
 * Creates a new equipment.
 * @param {*} authToken authToken from localStorage
 * @param {*} decodedEquipment the decoded equipment object to create
 * @return {Promise<Object>} The created decoded equipment object.
 */

export async function createEquipment(authToken, decodedEquipment) {
    console.log("createEquipment called with authToken:", authToken, "and decodedEquipment:", decodedEquipment);
    if(!authToken || !decodedEquipment) {
        throw new Error("authToken and decoded equipment are required");
    }
    delete decodedEquipment.id; // Ensure no ID is sent for creation
    try {
        const encodedEquipment = encodeEquipmentObject(decodedEquipment);
        delete encodedEquipment.id; // Ensure no ID is sent for creation
        console.log("encoded equipment:", encodedEquipment);
        const response = await axios.post(`${process.env.BACKEND_URI}/equipment`, encodedEquipment, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return decodeEquipmentObject(response.data);
    } catch(error) {
        console.error("Error in createEquipment:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            throw new Error(`Error: ${error.response.data.message || 'Unknown error'}`);
        } else {
            throw new Error('Network error or server not reachable');
        }
    }
}
