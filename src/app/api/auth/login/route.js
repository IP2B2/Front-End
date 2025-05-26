import axios from "axios";
/**
 * 
 * @param {NextRequest} request 
 */

export async function POST(request) {
    const body = await request.json();

    if (!body?.email || !body?.password) {
        return new Response(JSON.stringify({ error: "Email and password are required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    try {
        const res = await axios.post(process.env.BACKEND_URI +'/auth/login', {
            username:  body?.email,
            password: body?.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            validateStatus: status => {
                return status === 200;
            }
        });

        const responseRoles = await axios.get(process.env.BACKEND_URI + '/auth/roles', {
            headers: {
                Authorization: `Bearer ${res.data.token}`,
                "Content-Type": "application/json"
            }
        });

        if(!responseRoles.data || !Array.isArray(responseRoles.data)) {
            return new Response(JSON.stringify({ error: "Invalid roles response" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }


        const { token } = res.data;
        return new Response(JSON.stringify({ message: "Authentication successful", token: token, roles: responseRoles.data }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error("Authentication error:", error);
        return new Response(JSON.stringify({ error: "Authentication failed" }), {
            status: error.response?.status || 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}