'use client';

import { useState } from "react";

import styles from "./registerPage.module.css";
import '@/app/globals.css';
import { DefaultFormLayout, FormContainer, FormMultiColumn, FormField, FormButton } from "@/lib/components/form/Form";
import { Inter700, Inter500, Inter600 } from '@/lib/fonts/Inter';
import { useRouter } from 'next/navigation'; 

export default function ExtraDataRequired() {
    const router = useRouter();

    const [prenume, setPrenume] = useState("");
    const [nume, setNume] = useState("");
    const [rol, setRol] = useState("");
    const [facultate, setFacultate] = useState("");

    const [parola, setParola] = useState("");
    const [confirmParola, setConfirmParola] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
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
                            trim
                            />
                        <FormField 
                            type={"text"} 
                            label={"Nume de familie"} 
                            placeholder={"ex: Popescu"}
                            setState={setNume} 
                            trim
                            /> 
                    </FormMultiColumn>
                    <FormMultiColumn cols={2}>
                        <FormField 
                            type={"text"} 
                            label={"Rol"} 
                            placeholder={"ex: student"}
                            setState={setRol} 
                            trim
                            />
                        <FormField 
                            type={"text"} 
                            label={"Facultate"} 
                            placeholder={"ex: Facultatea de Informatica Iasi"}
                            setState={setFacultate} 
                            trim
                            /> 
                    </FormMultiColumn>
                    <FormField 
                        type={"password"} 
                        label={"Parola"} 
                        placeholder={"***************"}
                        setState={setParola} 
                        trim
                        />
                    <FormField 
                        type={"text"} 
                        label={"Confirmare parola"} 
                        placeholder={"***************"}
                        setState={setConfirmParola} 
                        trim
                        />
                    <FormButton>Finalizaeaza</FormButton>
                </FormContainer>
            </DefaultFormLayout>
        </div>
    );
}