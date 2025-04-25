'use client';

import { useEffect, useState } from "react";

import Link from "next/link";

import styles from "./loginPage.module.css";
import formStyles from "./FormStyles.module.css"
import '@/app/globals.css';
import { Inter700, Inter500, Inter600 } from '@/lib/fonts/Inter';

import { testValidEmail, testValidPassword } from "@/lib/logic/AuthValidators";

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

const DefaultFormLayout = (
    { 
        title,
        subtitle,
        showError, 
        errorMessage,
        children
    }
) => {
    return (
        <div className={formStyles.defaultFormLayoutContainer}>
            <div className={formStyles.formHeaderWrapper}>
                <div className={`${formStyles.formTitle} ${Inter700.className}`}>{title}</div>
                <div className={`${formStyles.formSubtitle} ${Inter500.className}`}>{subtitle}</div>
            </div>
            {children}
        </div>
    )
}

const FormContainer = ({ children }) => {
    return (
        <form className={formStyles.formContainer} noValidate> { /* nu scoate 'noValidate'= face ca html sa nu valideze singur - ci vom valida programatic din react cu functii */}
            {children}
        </form>
    )
}

const FormLink = ({ href = '', children }) => {
    return (
        <div className={`${formStyles.formLinkWrapper} ${Inter500.className}`}> 
            <Link 
                href={href} 
                className={formStyles.formLink}
                >
                {children}
            </Link>
        </div>
    );
} 

const FormButton = ({ onClick, children }) => {

    const buttonBehavior = (event) => {
        event.preventDefault();
        if(onClick)
            return onClick(event);
    }

    return (
        <button 
            type={"submit"} 
            onClick={buttonBehavior} 
            className={`${formStyles.formButton} border-rounded ${Inter600.className}`}>
            {children}
        </button>
    )
}

const FormField = ({ type, placeholder, validator, setState, trim, label, validate = true }) => {

    const [inputValue, setInputValue] = useState('');
    
    const [isInputError, setIsInputError] = useState(false);
    const [inputError, setInputError] = useState(null);

    const handleInputChange = (event) => {
        if(trim) setInputValue(event.target.value.trim());
        else     setInputValue(event.target.value);
    }

    useEffect(() => {
        setState(inputValue);
        if(!validate || !validator)
            return;
        
        let validationMessage = validator(inputValue);
        if(!validationMessage || validationMessage?.length < 1)
            setInputError(null);
        else setInputError(validationMessage);
    }, [inputValue, validate]);

    useEffect(() => {
        setIsInputError(!!inputError);
    }, [inputError])

    return (
        <div className={`${formStyles.formInputGroup} ${Inter600.className}`}>
            <label>
                {label}
                <input 
                    className={`${formStyles.formInput} border-rounded border-gray ${Inter600.className} ${isInputError ? formStyles.formInputError : ''}`} 
                    placeholder={placeholder} 
                    type={type}
                    onChange={handleInputChange}/>
            </label>
            <div className={`${formStyles.formInputErrorMessage}`}>
                { validate && isInputError ? inputError : ''}
            </div>
        </div>
    );
}