import axios from "axios";
/**
 * 
 * @param {NextRequest} request 
 */

export async function POST(request) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const body = await request.json();
    try {
        const res = await axios.post('https://88.80.135.108/api/auth/login', {
            username: 'user1',
            password: body?.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            validateStatus: status => {
                return status === 200;
            }
        });

        const { token } = res.data;
        return new Response(JSON.stringify({ message: "Authentication successful", token: token }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
/*                 'Authorization': `Bearer ${token}` */
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Authentication failed" }), {
            status: error.response?.status || 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}