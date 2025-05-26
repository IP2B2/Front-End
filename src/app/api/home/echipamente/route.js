import { AuthHeaderMissingResponse, UnauthorizedAccessResponse, ForbiddenAccessResponse, InternalErrorResponse } from "@/lib/logic/api/nextApiResp";
import axios from "axios";
/**
 * 
 * @param {NextRequest} request 
 */

export async function GET(request) { 
    const authorizationHeader = request.headers.get('Authorization');
    if (!authorizationHeader) {
        return AuthHeaderMissingResponse();
    }
    try {
        const response = await axios.get(process.env.BACKEND_URI + '/equipment', {
            headers: {
                Authorization: authorizationHeader,
            }
        });
        if (!response.data || !Array.isArray(response.data)) {
            return InternalErrorResponse();
        }
        const data = response.data.map(equipment => ({
            id: equipment.id,
            name: equipment.name,
            availabilityStatus: equipment.availabilityStatus,
            labId: equipment.laboratoryId
        }));
        
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
            return UnauthorizedAccessResponse();
        }
        if (error.response && error.response.status === 403) {
            return ForbiddenAccessResponse();
        }
        return InternalErrorResponse();
    }
}