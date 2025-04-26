'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';

import styles from "./loginPage.module.css";
import '@/app/globals.css';

import { testValidEmail, testValidPassword } from "@/lib/logic/AuthValidators";

import { DefaultFormLayout, FormContainer, FormField, FormButton, FormLink } from "@/lib/components/form/Form";


export default function LoginPage() {
    const router = useRouter(); 
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");

    const [isSubmitError, setIsSubmitError] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleLogin = async () => {
        setHasSubmitted(true);

        const emailError = testValidEmail(emailField);
        const passwordError = testValidPassword(passwordField);

        if (!emailError && !passwordError) {
            console.log("Login successful, redirecting...");
            router.push('/home'); 
            setIsSubmitError(false);
        } else {
            console.log("Login failed validation");
            setIsSubmitError(true); 
        }
    };

    return (
    <div className={styles.loginContainer}>
        <DefaultFormLayout
            title={"Autentificare"}
            subtitle={"Introdu datele de autentificare în formularul de mai jos"}
            showError={isSubmitError}
            errorMessage={"Email sau parola invalida."}
        >
            <FormContainer>
                <FormField 
                    type={"email"} 
                    label={"Email"} 
                    placeholder={"exemplu@info.uaic.ro"}
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
                <FormButton onClick={handleLogin}>
                    Autentificare
                </FormButton>
            </FormContainer>

            <FormLink href="#">Ai uitat parola?</FormLink>
            <FormLink href="/auth/register">Nu ai un cont?</FormLink>

        </DefaultFormLayout>
    </div>
    );
}