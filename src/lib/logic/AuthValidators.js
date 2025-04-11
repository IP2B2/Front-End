


const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z0-9-]+)+$/;

export const testValidEmailFormat = (inputEmail) => {
    if(!new RegExp(emailRegex).test(inputEmail)){
        return false;
    }
    return true;
}

export const testValidEmail = (inputEmail) => {
    if(!testValidEmailFormat(inputEmail)) {
        return "Format invalid."
    }
    return "";
}

const validCharactersRegex = /^[A-Za-z0-9~`!@#$%^&*()_\-+={[}\ \]|\\:;"'<,>\.?/]+$/;

export const testValidPasswordCharacters = (inputPassword) => {
    var regexp = new RegExp(validCharactersRegex);
    return !!(regexp.test(inputPassword));
}

export const testValidPasswordLength = (inputPassword) => {
    if(inputPassword?.length < 3 || inputPassword?.length > 32) {
        return false;
    }
    return true;
}

export const testValidPassword = (inputPassword) => {
    if(!testValidPasswordLength(inputPassword)) {
        return "Parola trebuie sa contina intre 3 si 32 de caractere."
    }
    if(!testValidPasswordCharacters(inputPassword)) {
        return "Parola contine caractere invalide."
    }
    return "";
}
