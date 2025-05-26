



export const acquisitionDateValidator = (date) => {
    if(!date) {
        return "Data achiziției nu poate fi goală.";
    }
    const today = new Date();
    const inputDate = new Date(date);
    if(inputDate > today) {
        return "Data achiziției nu poate fi în viitor.";
    }
    return "";
}