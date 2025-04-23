'use client';

import { useState } from "react";

import styles from "./loginPage.module.css";
import '@/app/globals.css';

import { testValidEmail, testValidPassword } from "@/lib/logic/AuthValidators";

import { DefaultFormLayout, FormContainer, FormField, FormButton, FormLink } from "@/lib/components/form/Form";


export default function LoginPage() {
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");

    const [isSubmitError, setIsSubmitError] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    return (
    <div className={styles.loginContainer}>
        <DefaultFormLayout
            title={"Autentificare"}
            subtitle={"Introdu datele de autentificare în formularul de mai jos"}
            showError={isSubmitError}
            errorMessage={"Aici va fi mesajul de eroare dupa implementare backend"}
        >
            <FormContainer>
                <FormField 
                    type={"email"} 
                    label={"Email"} 
                    placeholder={"exemplu@gmail.com"}
                    setState={setEmailField} 
                    trim
                    validator={testValidEmail}
                    validate={hasSubmitted}
                    />
                <FormField
                    type={"password"} 
                    label={"Parola"}
                    placeholder={"*************"}
                    setState={setPasswordField}
                    validator={testValidPassword}
                    validate={hasSubmitted}
                    />
                <FormButton onClick={() => setHasSubmitted(true)}>
                    Autentificare
                </FormButton>
            </FormContainer>

            <FormLink>Ai uitat parola?</FormLink>
            <FormLink>Nu ai un cont?</FormLink>

        </DefaultFormLayout>
    </div>
    );
}