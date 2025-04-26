


const emailRegex = new RegExp(/^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9]+[a-zA-Z0-9-]*[a-zA-Z0-9]+\.(?:[a-zA-Z0-9]+)+$/);

/**
 * Verifies if string is a valid email address
 * @param {string} inputEmail 
 * @returns boolean true if valid 
 */

const testValidEmailFormat = (inputEmail) => !!emailRegex.test(inputEmail) && !inputEmail.charAt(0) != '.' && !inputEmail.charAt(0) != '-' && !inputEmail.includes('..') && !inputEmail.includes('-@') && !inputEmail.includes('@-') && !inputEmail.includes('@.') && !inputEmail.includes('.@') && !inputEmail.includes('-.') && !inputEmail.includes('.-');

export const testValidEmail = (inputEmail) => {
    if(!inputEmail) return "";
    if(!testValidEmailFormat(inputEmail)) {
        return "Format invalid."
    }
    return "";
}

const validCharactersRegex = new RegExp(/^[A-Za-z0-9~`!@#$%^&*()_\-+={[}\ \]|\\:;"'<,>\.?/]+$/);

const testValidPasswordCharacters = (inputPassword) => !!(validCharactersRegex.test(inputPassword));

const testValidPasswordLength = (inputPassword) => inputPassword?.length > 2 && inputPassword?.length < 33;

export const testValidPassword = (inputPassword) => {
    if(!inputPassword) return "";
    if(!testValidPasswordLength(inputPassword)) {
        return "Parola trebuie sa contina intre 3 si 32 de caractere."
    }
    if(!testValidPasswordCharacters(inputPassword)) {
        return "Parola contine caractere invalide."
    }
    return "";
}
