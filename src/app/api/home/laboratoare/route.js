import axios from "axios";
/**
 * 
 * @param {NextRequest} request 
 */

export async function GET(request) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const bearerHeader = request.headers.get('Authorization');
    if (!bearerHeader) {
        return new Response(JSON.stringify({ error: "Authorization header missing" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    try {
        const response2 = await axios.get(process.env.BACKEND_URI + '/laboratories/all', {
            headers: {
                Authorization: bearerHeader
            }
        });
        return new Response(JSON.stringify(response2.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.log(error);
        if(error.response && error.response.status === 401) {
            return new Response(JSON.stringify({ error: "Unauthorized access" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        if(error.response && error.response.status === 403) {
            return new Response(JSON.stringify({ error: "Forbidden access" }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return new Response(JSON.stringify({ error: "Failed to fetch laboratories" }), {
            status: error.response?.status || 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}