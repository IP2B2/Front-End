

const routes = {
    'home' : {
        title: 'Acasa',
        pageDisplayName: 'Acasa',
        requiresAuth: true,
        route: '/home/',
    },
    'login' : {
        title: 'Autentificare',
        requiresAuth: false,
        route: '/auth/login',
    },
    'register' : {
        title: 'Inregistrare',
        requiresAuth: false,
        route: '/auth/register',
    },
    'register-extra-data': {
        title: 'Inregistrare - date suplimentare',
        requiresAuth: false,
        route: '/auth/extra-data-required',
    },
    'confirm-mail': {
        title: 'Confirmare email',
        requiresAuth: false,
        route: '/auth/confirm-mail',
    },
    'forgot-password' : {
        title: 'Recuperare parola (forgot password)',
        requiresAuth: false,
        route: '/auth/forgot-password',
    },
    'reset-password' : {
        title: 'Resetare parola (reset password)',
        requiresAuth: false,
        route: '/auth/reset-password',
    },
    'reset-password-intentionat': {
        title: 'Resetare parola intentionata (white screen)',
        requiresAuth: false,
        route: '/auth/reset-password-intentionat',
    },
    'laboratoare' : {
        title: 'Laboratoare',
        pageDisplayName: 'Laboratoare',
        requiresAuth: true,
        route: '/home/laboratoare',
    },
    'echipamente' : {
        title: 'Echipamente',
        pageDisplayName: 'Echipamente',
        displayNameInHeader: false,
        requiresAuth: true,
        route: '/home/echipamente',
    },
    'produs': {
        title: 'Echipament',
        requiresAuth: true,
        route: '/home/echipamente/echipament',
    },
    'inchiriere-simplu': {
        title: 'Inchiriere echipament simplu',
        requiresAuth: true,
        route: '/home/inchiriere/echipament-simplu',
    },
    'inchiriere-complex': {
        title: 'Inchiriere echipament complex',
        requiresAuth: true,
        route: '/home/inchiriere/echipament-complex',
    },
    'listare-cerere': {
        title: 'Testing: listare-cerere',
        requiresAuth: true,
        route: '/home/testing/listare-cerere',
    },
    'pagina-confirmare-decizie-admin': {
        title: 'Pagina confirmare decizie - ADMIN',
        requiresAuth: true,
        route: '/home/confirmare-decizie-admin',
    }
}

export default routes;