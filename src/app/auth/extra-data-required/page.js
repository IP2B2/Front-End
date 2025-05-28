'use client';

import { useState, useEffect } from "react";

import styles from "./registerPage.module.css";
import '@/app/globals.css';
import { DefaultFormLayout, FormContainer, FormMultiColumn, FormField, FormButton, FormLink } from "@/lib/components/form/Form";
import { useRouter } from 'next/navigation'; 

import { emptyInvalidator } from "@/lib/logic/AuthValidators";

export default function ExtraDataRequired() {
    const router = useRouter();

    const [prenume, setPrenume] = useState("");
    const [nume, setNume] = useState("");
    const [rol, setRol] = useState("");
    const [facultate, setFacultate] = useState("");

    const [parola, setParola] = useState("");
    const [confirmParola, setConfirmParola] = useState("");
    
    const [isSubmitError, setIsSubmitError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const allFieldsHaveText = 
            prenume.trim() !== "" && 
            nume.trim() !== "" && 
            rol.trim() !== "" && 
            facultate.trim() !== "" && 
            parola.trim() !== "" && 
            confirmParola.trim() !== "";
        
        const passwordsMatch = parola === confirmParola;
        
        setIsFormValid(allFieldsHaveText && passwordsMatch);
        
        if (isSubmitError) {
            setIsSubmitError(false);
        }
    }, [prenume, nume, rol, facultate, parola, confirmParola, isSubmitError]);

    const validateConfirmPassword = (value) => {
        if (!value.trim()) {
            return "Confirmarea parolei este obligatorie";
        }
        if (value !== parola) {
            return "Parolele nu coincid";
        }
        return "";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setHasSubmitted(true);
        
        let errors = "";
        [prenume, nume, rol, facultate, parola].forEach(input => {
            errors += emptyInvalidator(input);
        });
        
        if (parola !== confirmParola) {
            setIsSubmitError(true);
            setErrorMessage("Parolele introduse nu coincid. Verificați și încercați din nou.");
            return;
        }
        
        if (errors !== "") {
            setIsSubmitError(true);
            setErrorMessage("Toate câmpurile sunt obligatorii. Verificați și încercați din nou.");
            return;
        }
        
        setIsSubmitError(false);
        router.push('/home');
    };

    return (
        <div className={styles.registerContainer}>
            <DefaultFormLayout
                title={"Mai avem nevoie de date"}
                subtitle={"Introdu datele tale în formularul de mai jos pentru a finaliza crearea contului."}
                showError={isSubmitError}
                errorMessage={errorMessage}>
                <FormContainer>
                <FormMultiColumn cols={2}>
                        <FormField 
                            type={"text"} 
                            label={"Prenume"} 
                            placeholder={"ex: Alexandru"}
                            setState={setPrenume}
                            validator={emptyInvalidator}
                            validate={hasSubmitted}
                            trim
                            />
                        <FormField 
                            type={"text"} 
                            label={"Nume de familie"} 
                            placeholder={"ex: Popescu"}
                            setState={setNume} 
                            trim
                            validator={emptyInvalidator}
                            validate={hasSubmitted}
                            /> 
                    </FormMultiColumn>
                    <FormMultiColumn cols={2}>
                        <FormField 
                            type={"text"} 
                            label={"Rol"} 
                            placeholder={"ex: student"}
                            setState={setRol} 
                            trim
                            validator={emptyInvalidator}
                            validate={hasSubmitted}
                            />
                        <FormField 
                            type={"text"} 
                            label={"Universitate / Centru"} 
                            placeholder={"ex: Facultatea de Informatică Iasi"}
                            setState={setFacultate} 
                            trim
                            validator={emptyInvalidator}
                            validate={hasSubmitted}
                            /> 
                    </FormMultiColumn>
                    <FormField 
                        type={"password"} 
                        label={"Parolă"} 
                        placeholder={"***************"}
                        setState={setParola} 
                        trim
                        validator={emptyInvalidator}
                        validate={hasSubmitted}
                        />
                    <FormField 
                        type={"password"} 
                        label={"Confirmare parolă"} 
                        placeholder={"***************"}
                        setState={setConfirmParola} 
                        trim
                        validator={validateConfirmPassword}
                        validate={hasSubmitted}
                        />
                    <FormButton 
                        onClick={handleSubmit} 
                        isValid={isFormValid}
                    >
                        Finalizează
                    </FormButton>
                    <FormLink href="/auth/login">Înapoi</FormLink>
                </FormContainer>
            </DefaultFormLayout>
        </div>
    );
}