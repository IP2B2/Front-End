'use client';

import { useState } from "react";
import styles from "./formInchiriere.module.css";
import '@/app/globals.css';
import { DefaultFormLayout, FormContainer, FormMultiColumn, FormField, FormButton, FormLink } from "@/lib/components/form/Form";
import { useRouter } from 'next/navigation'; 

const cnpValidator = (input) => {
    if(!input) return "CNP-ul nu poate fi gol.";
    if(input.length !== 13 || !/^\d+$/.test(input)) return "CNP-ul trebuie să conțină exact 13 cifre.";
    return "";
}

const daysValidator = (input) => {
    if(!input) return "Numărul de zile nu poate fi gol.";
    if(!/^\d+$/.test(input)) return "Introduceți un număr valid.";
    if(parseInt(input) <= 0) return "Numărul de zile trebuie să fie mai mare decât 0.";
    return "";
}

export default function ProductRentalForm() {
    const router = useRouter();

    const [cnp, setCnp] = useState("");
    const [address, setAddress] = useState("");
    const [rentalDays, setRentalDays] = useState("");

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setHasSubmitted(true);
        
        let errors = "";
        errors += cnpValidator(cnp);
        errors += emptyInvalidator(address);
        errors += daysValidator(rentalDays);
        
        if(errors === "") {
            // Submit the form data
            console.log("Form submitted:", { cnp, address, rentalDays });
            // Here you would typically send data to an API
            alert("Formularul a fost trimis cu succes!");
        }
    };

    const handleClear = () => {
        setCnp("");
        setAddress("");
        setRentalDays("");
        setHasSubmitted(false);
    };

    const isFormValid = () => {
        return (
            cnpValidator(cnp) === "" &&
            emptyInvalidator(address) === "" &&
            daysValidator(rentalDays) === ""
        );
    };
    

    return (
        <div className={styles.rentalContainer}>
            <DefaultFormLayout
                title={"Formular Închiriere Produs"}
                subtitle={"Completează formularul de mai jos pentru a închiria produsul"}>
                <FormContainer>
                    <FormField 
                        type={"text"} 
                        label={"CNP"} 
                        placeholder={"Introduceți 13 cifre"}
                        setState={setCnp}
                        validator={cnpValidator}
                        validate={hasSubmitted}
                        maxLength={13}
                        />
                    <FormField 
                        type={"text"} 
                        label={"Adresă de domiciliu"} 
                        placeholder={"ex: Strada Principala nr. 1"}
                        setState={setAddress} 
                        validator={emptyInvalidator}
                        validate={hasSubmitted}
                        />
                    <div className={styles.formButtonContainer}>
                        <button 
                            className={styles.calendarButton}
                            onClick={() => alert("Aici s-ar deschide calendarul de disponibilitate")}
                        >
                            Calendar disponibilitate produs
                        </button>
                    </div>
                    <FormField 
                        type={"number"} 
                        label={"Număr de zile pentru închiriere"} 
                        placeholder={"Introduceți un număr"}
                        setState={setRentalDays}
                        validator={daysValidator}
                        validate={hasSubmitted}
                        min="1"
                        />
                    <div className={styles.buttonGroup}>
                        <button 
                            className={styles.clearButton}
                            onClick={handleClear}
                        >
                            Golește
                        </button>
                        <button 
                            className={`${styles.rentButton} ${isFormValid() ? styles.activeRentButton : ''}`}
                            onClick={handleSubmit}
                            disabled={!isFormValid()} // Butonul se dezactivează dacă formularul nu e valid
                        >
                            Închiriază
                        </button>
                    </div>
                </FormContainer>
            </DefaultFormLayout>
        </div>
    );
}

function emptyInvalidator(input) {
    if(!input) return "Câmpul nu poate fi gol.";
    return "";
}
