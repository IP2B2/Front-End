'use client';

import { useState } from "react";

import styles from "./registerPage.module.css";
import '@/app/globals.css';
import { DefaultFormLayout, FormContainer, FormMultiColumn, FormField, FormButton, FormLink } from "@/lib/components/form/Form";
import { Inter700, Inter500, Inter600 } from '@/lib/fonts/Inter';
import { useRouter } from 'next/navigation'; 

const emptyInvalidator = (input) => {
    if(!input) return "Nu poate fi gol.";
    return "";
}

export default function ExtraDataRequired() {
    const router = useRouter();

    const [prenume, setPrenume] = useState("");
    const [nume, setNume] = useState("");
    const [rol, setRol] = useState("");
    const [facultate, setFacultate] = useState("");

    const [parola, setParola] = useState("");
    const [confirmParola, setConfirmParola] = useState("");

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setHasSubmitted(true);
        let errors = "";
        [prenume, nume, rol, facultate, parola, confirmParola].forEach(input => {
            errors += emptyInvalidator(input);
        })
        if(errors == "")
            router.push('/home');
    };

    return (
        <div className={styles.registerContainer}>
            <DefaultFormLayout
                title={"Mai avem nevoie de date"}
                subtitle={"Introdu datele tale în formularul de mai jos pentru a finaliza crearea contului"}>
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
                            placeholder={"ex: Facultatea de Informatica Iasi"}
                            setState={setFacultate} 
                            trim
                            validator={emptyInvalidator}
                            validate={hasSubmitted}
                            /> 
                    </FormMultiColumn>
                    <FormField 
                        type={"password"} 
                        label={"Parola"} 
                        placeholder={"***************"}
                        setState={setParola} 
                        trim
                        validator={emptyInvalidator}
                        validate={hasSubmitted}
                        />
                    <FormField 
                        type={"text"} 
                        label={"Confirmare parola"} 
                        placeholder={"***************"}
                        setState={setConfirmParola} 
                        trim
                        validator={emptyInvalidator}
                        validate={hasSubmitted}
                        />
                    <FormButton onClick={handleSubmit}>Finalizaeaza</FormButton>
                    <FormLink href="/auth/login">Inapoi</FormLink>
                </FormContainer>
            </DefaultFormLayout>
        </div>
    );
}