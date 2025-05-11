'use client';

import styles from '../formInchiriere.module.css';
import { useState, useEffect } from "react";
import '@/app/globals.css';
import { DefaultFormLayout, FormContainer, FormMultiColumn, FormField, FormButton, FormLink } from "@/lib/components/form/Form";
import { useRouter } from 'next/navigation'; 

const today = new Date().toISOString().split("T")[0];

const cnpValidator = (input) => {
    if(!input) return "CNP-ul nu poate fi gol.";
    if(input.length !== 13 || !/^\d+$/.test(input)) return "CNP-ul trebuie să conțină exact 13 cifre.";
    return "";
}

const dateValidator = (input) => {
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
    const [rentalDate, setRentalDate] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(
            cnpValidator(cnp) === "" &&
            emptyInvalidator(address) === "" &&
            daysValidator(rentalDays) === "" &&
            dateValidator(rentalDate) === ""
        );
    }, [cnp, address, rentalDays, rentalDate]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setHasSubmitted(true);
        
        if(isFormValid) {
            console.log("Form submitted:", { cnp, address, rentalDays, rentalDate });
            alert("Formularul a fost trimis cu succes!");
        }
    };

    const handleClear = () => {
        setCnp("");
        setAddress("");
        setRentalDays("");
        setRentalDate("");
        setHasSubmitted(false);
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div>
            <button 
                onClick={handleGoBack}
                className={styles.backButton}
            >
                <div className={styles.backArrow}>
                    <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
                        <path d="M1 1L8.5 8.5L16 1" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
            </button>
        
            <div className={styles.rentalWrapper}>
                <div className={styles.rentalContainer}>
                    <DefaultFormLayout
                        title={"Formular Închiriere Produs"}
                        subtitle={"Completează formularul de mai jos pentru a închiria produsul"}>
                        <FormContainer>
                            <FormField
                                type={"text"}
                                label={"CNP"}
                                placeholder={"Introduceți 13 cifre"}
                                value={cnp}
                                setState={setCnp}
                                validator={cnpValidator}
                                validate={hasSubmitted}
                                maxLength={13}
                            />
                            <FormField
                                type={"text"}
                                label={"Adresă de domiciliu"}
                                placeholder={"ex: Strada Principala nr. 1"}
                                value={address}
                                setState={setAddress}
                                validator={emptyInvalidator}
                                validate={hasSubmitted}
                            />
                            <div className={styles.formButtonContainer}>
                                <button
                                    className={styles.calendarButton}
                                    onClick={(e) => {
                                        e?.preventDefault();
                                        alert("Aici s-ar deschide calendarul de disponibilitate")}}
                                >
                                    Calendar disponibilitate produs
                                </button>
                            </div>
                            <FormField
                                type={"number"}
                                label={"Număr de zile pentru închiriere"}
                                placeholder={"Introduceți un număr"}
                                value={rentalDays}
                                setState={setRentalDays}
                                validator={daysValidator}
                                validate={hasSubmitted}
                                min="1"
                            />

                            <FormField
                                type={"date"}
                                label={"Data închiriere"}
                                value={rentalDate}
                                setState={setRentalDate}
                                validator={dateValidator}
                                validate={hasSubmitted}
                                min={today}
                                max="2050-12-31"
                            />

                            <div className={styles.buttonGroup}>
                                <button
                                    className={styles.clearButton}
                                    onClick={handleClear}
                                >
                                    Golește
                                </button>
                                <button
                                    className={`${styles.rentButton} ${isFormValid ? styles.activeRentButton : ''}`}
                                    onClick={handleSubmit}
                                >
                                    Închiriază
                                </button>
                            </div>
                        </FormContainer>
                    </DefaultFormLayout>
                </div>
            </div>
        </div>
    );
}

function emptyInvalidator(input) {
    if(!input) return "Câmpul nu poate fi gol.";
    return "";
}