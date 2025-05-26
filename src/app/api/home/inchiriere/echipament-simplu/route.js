
import { AuthHeaderMissingResponse, UnauthorizedAccessResponse, ForbiddenAccessResponse, InternalErrorResponse } from "@/lib/logic/api/nextApiResp";
import axios from "axios";
/**
 * 
 * @param {NextRequest} request 
 */

export async function POST(request) {
    const authorizationHeader = request.headers.get('Authorization');
    console.log("Authorization Header:", authorizationHeader);
    if (!authorizationHeader) {
        return AuthHeaderMissingResponse();
    }

    const body = await request.json();
    try {
        const response = await axios.post(process.env.BACKEND_URI + '/access-requests', {
            requestDate: new Date(body.startDate).toISOString(),
            requestType: "PHYSICAL",
            status: "PENDING",
            proposalFile: "proposal.pdf",
            expectedReturnDate: new Date(body.returnDate).toISOString(),
            equipmentId: body.equipmentId
        }, {
            headers: {
                Authorization: authorizationHeader
            }
        });
        return new Response(JSON.stringify(response.data), {
            status: 200,
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