

import { AuthHeaderMissingResponse, ForbiddenAccessResponse, InternalErrorResponse, UnauthorizedAccessResponse } from "@/lib/logic/api/nextApiResp";
import axios from "axios";
/**
 * 
 * @param {NextRequest} request 
 */

export async function GET(request) {
    const bearerHeader = request.headers.get('Authorization');
    if (!bearerHeader) {
        return AuthHeaderMissingResponse();
    }
    try {
        const response = await axios.get(process.env.BACKEND_URI + '/auth/roles', {
            headers: {
                Authorization: bearerHeader,
                "Content-Type": "application/json"
            }
        });
        console.log("Response Data:", response.data);
        console.log("Response typeof Data:", typeof response.data);
        if(!response.data || !Array.isArray(response.data)) {
            return UnauthorizedAccessResponse();
        }
        if(!response.data.includes("STUDENT")) {
            return ForbiddenAccessResponse();
        }
        return new Response(JSON.stringify({ message: "User authenticated" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });


    } catch (error) {
        if(error.response && error.response.status === 401) {
            return UnauthorizedAccessResponse();
        }
        if(error.response && error.response.status === 403) {
            return ForbiddenAccessResponse();
        }
        return InternalErrorResponse();
    }
}