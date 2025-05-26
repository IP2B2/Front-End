
import { AuthCheckTokenUser } from './ApiCalls/AuthCalls';


export const CheckIsLoggedIn = async () => {
    'use client'
    const token = localStorage.getItem('authToken');
    console.log("localStorage.getItem('authToken')", localStorage.getItem('authToken'));
    console.log("localStorage", localStorage);
    if (!token) {
        return false;
    }
    const resolution = await AuthCheckTokenUser(token);
    if (resolution.error || resolution.status !== 200) {
        return false;
    }
    return true;
}

/**
 * 
 * @param {*} router 
 */
export const CheckIsLoggedInAndRedirect = async (router) => {
    'use client'
    const isLoggedIn = await CheckIsLoggedIn();
    if (!isLoggedIn) {
        redirectToLogin(router);
    }
}

export const redirectToLogin = (router) => {
    'use client'
    router.push('/auth/login');
}