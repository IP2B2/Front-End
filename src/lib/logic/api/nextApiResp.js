


// se foloseste cand request nu a fost trimis mai departe catre backend pentru ca nu exista header Authorization
export function AuthHeaderMissingResponse() {
    return new Response(JSON.stringify({ error: "Authorization header missing" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
    });
} 

export function UnauthorizedAccessResponse() {
    return new Response(JSON.stringify({ error: "Unauthorized access" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
    });
}

export function ForbiddenAccessResponse() {
    return new Response(JSON.stringify({ error: "Forbidden access" }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
    });
}

export function InternalErrorResponse() {
    return new Response(JSON.stringify({ error: "Internal Error" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
}