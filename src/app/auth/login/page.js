'use client';

import axios from 'axios';
import { useState } from "react";
import { useRouter } from 'next/navigation';

import styles from "./loginPage.module.css";
import '@/app/globals.css';

import { testValidEmail, testValidPassword } from "@/lib/logic/AuthValidators";

import { DefaultFormLayout, FormContainer, FormField, FormButton, FormLink, FormHollowButton } from "@/lib/components/form/Form";
import { AuthLogin } from '@/lib/logic/ApiCalls/AuthCalls';


export default function LoginPage() {
    const router = useRouter(); 
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");

    const [isSubmitError, setIsSubmitError] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleLogin = async () => {
        setHasSubmitted(true);

        const emailError = testValidEmail(emailField);
        const passwordError = testValidPassword(passwordField);

        if (emailError || passwordError) {
            console.log("Login failed validation");
            setIsSubmitError(true);
            return;
        }

        const loginResolution = await AuthLogin(emailField, passwordField);
        if(loginResolution.error) {
            setIsSubmitError(true);
            setSubmitError(loginResolution.payload);
            return;
        }
        setIsSubmitError(false);
        localStorage.setItem('authToken', loginResolution.payload);
        return router.push('/home');
    };
    const handleRedirectForgotPassword = async () => {
        console.log("Redirecting...");
            router.push('/auth/forgot-password'); 
    };


    return (
    <div className={styles.loginContainer}>
        <DefaultFormLayout
            title={"Autentificare"}
            subtitle={"Introdu datele de autentificare în formularul de mai jos"}
            showError={isSubmitError}
            errorMessage={submitError}
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
                    formInputId={"email"}
                    />
                <FormField
                    type={"password"} 
                    label={"Parola"}
                    placeholder={"*************"}
                    setState={setPasswordField}
                    validator={testValidPassword}
                    validate={hasSubmitted}
                    formInputId={"password"}
                    />
                <FormButton onClick={handleLogin}>
                    Autentificare
                </FormButton>

                <FormHollowButton onClick={handleRedirectForgotPassword}>
                    Ai uitat parola?
                </FormHollowButton>
            </FormContainer>

            <FormLink href="/auth/register">Nu ai un cont?</FormLink>

        </DefaultFormLayout>
    </div>
    );
}