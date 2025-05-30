'use client';

import { useState } from "react";
import { redirect } from 'next/navigation';

import styles from "./loginPage.module.css";
import '@/app/globals.css';

import { testValidEmail, testValidPassword } from "@/lib/logic/AuthValidators";

import { DefaultFormLayout, FormContainer, FormField, FormButton, FormLink, FormHollowButton } from "@/lib/components/form/Form";
import { performLogin } from "@/lib/actions/performLogin";


export default function LoginPage() {

    const [submitting, setSubmitting] = useState(false);

    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");

    const [isSubmitError, setIsSubmitError] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleLogin = async () => {

        setHasSubmitted(true);
        setSubmitting(true);

        const emailError = testValidEmail(emailField);
        const passwordError = testValidPassword(passwordField);

        if (emailError || passwordError) {
            console.log("Login failed validation");
            setIsSubmitError(true);
            return;
        }

        const loginResolution = await performLogin(emailField, passwordField);
        if(!loginResolution) return;
        alert(JSON.stringify(loginResolution));
        setSubmitting(false);
        if(loginResolution.status !== 200) {
            console.log("Login failed with status:", loginResolution.status);
            setIsSubmitError(true);
            setSubmitError(loginResolution.payload);
            return;
        }
        setIsSubmitError(false);
        redirect('/home');
    };
    const handleRedirectForgotPassword = async () => {
        console.log("Redirecting...");
        redirect('/auth/forgot-password'); 
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
                <FormButton onClick={handleLogin} disabled={submitting}>
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