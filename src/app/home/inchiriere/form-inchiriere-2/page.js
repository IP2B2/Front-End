'use client';

import styles from '../formInchiriere.module.css';
import { useState, useEffect } from "react";
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
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(
            cnpValidator(cnp) === "" &&
            emptyInvalidator(address) === "" &&
            daysValidator(rentalDays) === "" &&
            file !== null
        );
    }, [cnp, address, rentalDays, file]);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setHasSubmitted(true);
        
        if(isFormValid) {
            console.log("Form submitted:", { cnp, address, rentalDays, file });
            alert("Formularul a fost trimis cu succes!");
        }
    };

    const handleClear = () => {
        setCnp("");
        setAddress("");
        setRentalDays("");
        setFile(null);
        setHasSubmitted(false);
    };

    return (
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
                            setState={setRentalDays}
                            validator={daysValidator}
                            validate={hasSubmitted}
                            min="1"
                            />
            
                        {/* Zona de upload fisier */}
                        <div
                            className={`${styles.fileUploadContainer} ${isDragging ? styles.dragging : ''}`}
                            onDragEnter={handleDragEnter}
                            onDragOver={(e) => e.preventDefault()}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                id="file-upload"
                                className={styles.fileInput}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="file-upload" className={styles.fileUploadLabel}>
                                {file ? (
                                    <span className={styles.fileName}>{file.name}</span>
                                ) : (
                                    <>
                                        <span className={styles.uploadIcon}>📁</span>
                                        <span>Trage fișierul aici sau <u>click pentru a selecta</u></span>
                                    </>
                                )}
                            </label>
                            <p className={styles.fileUploadHint}>
                                Echipamentul dorit este unul complex, așadar necesită încărcarea unei cereri suplimentare.
                            </p>
                        </div>
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
                                disabled={!isFormValid}
                            >
                                Închiriază
                            </button>
                        </div>
                    </FormContainer>
                </DefaultFormLayout>
            </div>
        </div>
    );
}

function emptyInvalidator(input) {
    if(!input) return "Câmpul nu poate fi gol.";
    return "";
}