


const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z0-9-]+)+$/)

const testValidEmailFormat = (inputEmail) => !!emailRegex.test(inputEmail);

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
