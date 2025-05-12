'use client';

import styles from '../formInchiriere.module.css';
import { useState, useEffect } from "react";
import '@/app/globals.css';
import { DefaultFormLayout, FormContainer, FormMultiColumn, FormField, FormButton, FormLink } from "@/lib/components/form/Form";
import { useRouter } from 'next/navigation'; 

import { emptyInvalidator, cnpValidator, dateValidator, daysValidator } from "@/lib/logic/AuthValidators";

const today = new Date().toISOString().split("T")[0];

const filePdfValidator = (file) => {
    if (!file) return "Trebuie să încărcați fișierul cererii suplimentare.";
    
    // Verificăm atât extensia cât și tipul MIME
    const isPDF = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
    
    if (!isPDF) {
        return "⚠️ Fișierul încărcat nu este un PDF. Te rugăm să încarci un fișier .pdf.";
    }
    
    return "";
};

export default function ProductRentalForm() {
    const router = useRouter();

    const [cnp, setCnp] = useState("");
    const [address, setAddress] = useState("");
    const [rentalDays, setRentalDays] = useState("");
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [rentalDate, setRentalDate] = useState("");
    const [fileError, setFileError] = useState("");

    useEffect(() => {
        setIsFormValid(
            cnpValidator(cnp) === "" &&
            emptyInvalidator(address) === "" &&
            daysValidator(rentalDays) === "" &&
            dateValidator(rentalDate) === "" &&
            filePdfValidator(file) === ""
        );
    }, [cnp, address, rentalDays, file, rentalDate]);

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
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            setFile(droppedFile);
            setFileError(filePdfValidator(droppedFile));
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileError(filePdfValidator(selectedFile));
        } else {
            setFile(null);
            setFileError("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setHasSubmitted(true);

        const currentFileError = filePdfValidator(file);
        setFileError(currentFileError);
        
        if(isFormValid && currentFileError === "") {
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
        setFileError("");
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className={styles.pageContainer}>
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
                
                            <div className={styles.fileUploadWrapper}>
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
                                        accept=".pdf,application/pdf"
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
                                {(fileError || (hasSubmitted && filePdfValidator(file))) && (
                                    <p className={styles.fileError}>
                                        {fileError || filePdfValidator(file)}
                                    </p>
                                )}
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