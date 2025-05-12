


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
    if(typeof(inputEmail) === 'undefined') return "";
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
    if(typeof(inputMatricol) === 'undefined') return "";
    if(!testValidMatricolLength(inputMatricol)){
        return "Lungime necorespunzătoare.";
    }
    if(!testValidMatricolCharacters(inputMatricol)){
        return "Contine caractere necorespunzătoare."
    }
    return "";
}

export const emptyInvalidator = (input) => {
    if(!input) return "Câmpul nu poate fi gol.";
    return "";
}

export const cnpValidator = (input) => {
    if(!input) return "CNP-ul nu poate fi gol.";
    if(input.length !== 13 || !/^\d+$/.test(input)) return "CNP-ul trebuie să conțină exact 13 cifre.";
    return "";
}

export const dateValidator = (input) => {
    if (!input) return "Trebuie să selectați o dată de început pentru închiriere.";
    
    const rentalDate = new Date(input);
    const today = new Date();
    const maxDate = new Date("2050-12-31");
    
    today.setHours(0, 0, 0, 0);
    maxDate.setHours(0, 0, 0, 0);
    
    if (rentalDate < today) return "Data de închiriere nu poate fi înainte de ziua de azi.";
    if (rentalDate > maxDate) return "Data de închiriere nu poate depăși 31-12-2050.";

    return "";
};

export const daysValidator = (input) => {
    if(!input) return "Numărul de zile nu poate fi gol.";
    if(!/^\d+$/.test(input)) return "Introduceți un număr valid.";
    if(parseInt(input) <= 0) return "Numărul de zile trebuie să fie mai mare decât 0.";
    return "";
}