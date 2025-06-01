'use client';

import { useState } from "react";

import styles from "./registerPage.module.css";
import '@/app/globals.css';
import { DefaultFormLayout, FormContainer, FormMultiColumn, FormField, FormButton, FormLink, FormDropdown } from "@/lib/components/form/Form";
import { redirect, useParams, useRouter, useSearchParams } from 'next/navigation'; 

import { emptyInvalidator } from "@/lib/logic/AuthValidators";
import { performFinishRegister } from "@/lib/actions/performFinishRegister";

export default function ExtraDataRequired() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    console.log("token:", token);

    const router = useRouter();

    const [prenume, setPrenume] = useState("");
    const [nume, setNume] = useState("");
    const [rol, setRol] = useState("");
    const [facultate, setFacultate] = useState("");

    const [role, setRole] = useState("");
    const [an, setAn] = useState("");
    const [grupa, setGrupa] = useState("");




    const [parola, setParola] = useState("");
    const [confirmParola, setConfirmParola] = useState("");

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setHasSubmitted(true);
        let errors = "";
        [prenume, nume, rol, facultate, parola, confirmParola].forEach(input => {
            errors += emptyInvalidator(input);
        })
        if(errors != "")
            return;

        if (parola !== confirmParola) {
            return;
        }

        let registerData = {
            firstName: prenume,
            lastName: nume,
            role: rol,
            facultate: facultate,
            an: an,
            grupa: grupa,
            newPassword: parola,
            token: token
        }

        try {
            const registerResolution = await performFinishRegister(registerData);
            if (!registerResolution.success) {
                console.error("Finish register failed:", registerResolution);
                return;
            }
            redirect('/auth/login');
        } catch (error) {
            console.error("Error during finish register:", error);
        }

    };

    return (
        <div className={styles.registerContainer}>
            <DefaultFormLayout
                title={"Mai avem nevoie de date"}
                subtitle={"Introdu datele tale în formularul de mai jos pentru a finaliza crearea contului."}>
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
                        <FormDropdown
                            label={"Rol"}
                            options={[
                                { value: "STUDENT", label: "Student" },
                                { value: "RESEARCHER", label: "Researcher" },
                                { value: "COORDONATOR", label: "Coordonator" },
                            ]}
                            setState={setRol}
                            validate={hasSubmitted}
                            validator={emptyInvalidator}
                        />
                        <FormField
                            type={"text"}
                            label={"Facultate"} 
                            placeholder={"ex: Facultatea de Informatică Iasi"}
                            setState={setFacultate} 
                            trim
                            validator={emptyInvalidator}
                            validate={hasSubmitted}
                            /> 
                    </FormMultiColumn>
                    <FormMultiColumn cols={2}>
                        <FormField
                            type={"text"}
                            label={"Anul de studiu"}
                            placeholder={"ex: 1"}
                            setState={setAn}
                            trim
                            validator={emptyInvalidator}
                            validate={hasSubmitted}
                            />
                        <FormField
                            type={"text"}
                            label={"Grupa"}
                            placeholder={"ex: 1A"}
                            setState={setGrupa}
                            trim
                            validator={emptyInvalidator}
                            validate={hasSubmitted}
                            formInputId={"grupa-input"}
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
                        type={"text"} 
                        label={"Confirmare parolă"} 
                        placeholder={"***************"}
                        setState={setConfirmParola} 
                        trim
                        validator={emptyInvalidator}
                        validate={hasSubmitted}
                        />
                    <FormButton onClick={handleSubmit}>Finalizează</FormButton>
                    <FormLink href="/auth/login">Înapoi</FormLink>
                </FormContainer>
            </DefaultFormLayout>
        </div>
    );
}