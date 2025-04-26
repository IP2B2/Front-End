


const emailRegex = new RegExp(/^[a-zA-Z0-9\.\-]+@(?:[a-zA-Z0-9-]+\.)*uaic.ro$/);

/**
 * Verifies if string is a valid email address
 * @param {string} inputEmail 
 * @returns boolean true if valid 
 */
const testEmailInvalidFirstChar = (inputEmail) => inputEmail.charAt(0) === '.' || inputEmail.charAt(0) === '-';

const testValidEmailFormat = (inputEmail) => 
    !!emailRegex.test(inputEmail) 
    && !testEmailInvalidFirstChar(inputEmail) 
    && !inputEmail.includes('..') 
    && !inputEmail.includes('-.') 
    && !inputEmail.includes('.-')
    && !inputEmail.includes('--')
    && !inputEmail.includes('-@') 
    && !inputEmail.includes('@-')
    && !inputEmail.includes('@.') 
    && !inputEmail.includes('.@'); 

/**
 * Tests if string is in valid email format
 * @param {string} inputEmail 
 * @returns error or "" if no errors
 */
export const testValidEmail = (inputEmail) => {
    if(!inputEmail) return "";
    if(!inputEmail.endsWith('uaic.ro')) {
        return "Furnizati un email uaic.ro";
    }
    if(!testValidEmailFormat(inputEmail)) {
        return "Format invalid."
    }
    return "";
}

const validCharactersRegex = new RegExp(/^[A-Za-z0-9~`!@#$%^&*()_\-+={[}\ \]|\\:;"'<,>\.?/]+$/);

const testValidPasswordCharacters = (inputPassword) => !!(validCharactersRegex.test(inputPassword));

const testValidPasswordLength = (inputPassword) => inputPassword?.length > 2 && inputPassword?.length < 33;

export const testValidPassword = (inputPassword) => {
    if(typeof(inputPassword) === 'undefined') return "";
    if(!testValidPasswordLength(inputPassword)) {
        return "Parola trebuie sa contina intre 3 si 32 de caractere."
    }
    if(!testValidPasswordCharacters(inputPassword)) {
        return "Parola contine caractere invalide."
    }
    return "";
}

const validMatricolCharactersRegex = new RegExp(/^[A-Za-z0-9]+$/);
 const testValidMatricolCharacters = (inputMatricol) => !!(validMatricolCharactersRegex.test(inputMatricol));
 const testValidMatricolLength = (inputMatricol) => inputMatricol?.length > 6 && inputMatricol?.length < 19;
 
export const testValidMatricol = (inputMatricol) => {
     if(!inputMatricol) return "";
     if(!testValidMatricolLength(inputMatricol)){
         return "Lungime necorespunzătoare.";
     }
     if(!testValidMatricolCharacters(inputMatricol)){
         return "Contine caractere necorespunzătoare."
     }
     return "";
 }
