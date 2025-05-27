'use server'
import axios from 'axios';

/**
 * Creates a new access request.
 * @param {string} authToken authToken from localStorage
 * @param {Object} accessRequest The access request object to create
 * @return {Promise<Object>} The created access request object.
 */

export async function createAccessRequest(authToken, accessRequest) {
    if (!authToken || !accessRequest) {
        throw new Error("authToken and access request are required");
    }
    if (   !accessRequest.equipmentId 
        || !accessRequest.status
        || !accessRequest.requestDate
        || !accessRequest.expectedReturnDate
    ) {
        throw new Error("accessRequest must include equipmentId, approverId, requestDate, and expectedReturnDate");
    }

    try {
        let filteredAccessRequest = {}
        filteredAccessRequest.equipmentId = accessRequest.equipmentId;
        filteredAccessRequest.status = accessRequest.status;
        filteredAccessRequest.requestDate = accessRequest.requestDate;
        filteredAccessRequest.expectedReturnDate = accessRequest.expectedReturnDate;
        filteredAccessRequest.status = "PENDING"
        filteredAccessRequest.requestType = accessRequest.requestType || "PHYSICAL";
        if (accessRequest.proposalFile) {
            filteredAccessRequest.proposalFile = accessRequest.proposalFile;
        }
        console.log("Filtered Access Request:", filteredAccessRequest);
        const response = await axios.post(`${process.env.BACKEND_URI}/access-requests`, filteredAccessRequest, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in createAccessRequest:", error);
        console.log(error.response.status);
        console.log(error);
        console.log(error.response.data);
        throw new Error('Network error or server not reachable');
    }
}

export async function getAccessRequestsByEquipmentId(authToken, equipmentId) {
    if (!authToken || !equipmentId) {
        throw new Error("authToken and equipmentId are required");
    }

    try {
        const response = await axios.get(`${process.env.BACKEND_URI}/equipments/${equipmentId}/accessRequests`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data._embedded.accessRequests;
    } catch (error) {
        console.error("Error in getAccessRequestsByEquipmentId:", error);
        console.log(error.response.status);
        console.log(error);
        throw new Error('Network error or server not reachable');
    }
}

/**
 * Gets access request by ID.
 * @param {string} authToken authToken from localStorage
 * @param {number} accessRequestId The ID of the access request to retrieve.
 * @return {Promise<Object>} The access request object.
 */

export async function getAccessRequestById(authToken, accessRequestId) {
    if (!authToken || !accessRequestId) {
        throw new Error("authToken and accessRequestId are required");
    }

    try {
        const response = await axios.get(`${process.env.BACKEND_URI}/access-requests/${accessRequestId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in getAccessRequestById:", error);
        console.log(error.response.status);
        console.log(error);
        throw new Error('Network error or server not reachable');
    }
}

/**
 * Get all access requests.
 * @param {string} authToken authToken from localStorage
 * @return {Promise<Array>} An array of access request objects.
 */
export async function getAllAccessRequests(authToken) {
    if (!authToken) {
        throw new Error("authToken is required");
    }

    try {
        const response = await axios.get(`${process.env.BACKEND_URI}/access-requests`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in getAllAccessRequests:", error);
        console.log(error.response.status);
        console.log(error);
        throw new Error('Network error or server not reachable');
    }
}

export async function approveAccessRequest(authToken, accessRequestId) {
    if (!authToken || !accessRequestId) {
        throw new Error("authToken and accessRequestId are required");
    }

    try {
        const res = await axios.get(`${process.env.BACKEND_URI}/access-requests/${accessRequestId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        let newAccessRequest = res.data;
        newAccessRequest.status = "APPROVED";

        const response = await axios.put(`${process.env.BACKEND_URI}/access-requests/${accessRequestId}`, newAccessRequest, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in approveAccessRequest:", error);
        console.log(error.response.status);
        console.log(error);
        throw new Error('Network error or server not reachable');
    }
}

export async function rejectAccessRequest(authToken, accessRequestId) {
    if (!authToken || !accessRequestId) {
        throw new Error("authToken and accessRequestId are required");
    }

    try {
        const res = await axios.get(`${process.env.BACKEND_URI}/access-requests/${accessRequestId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        let newAccessRequest = res.data;
        newAccessRequest.status = "REJECTED";

        const response = await axios.put(`${process.env.BACKEND_URI}/access-requests/${accessRequestId}`, newAccessRequest, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in rejectAccessRequest:", error);
        console.log(error.response.status);
        console.log(error);
        throw new Error('Network error or server not reachable');
    }
}
