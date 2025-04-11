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
        <div className={styles.title + " " + Inter700.className}> Autentificare </div>
        <div className={styles.subtitle + " " + Inter500.className}>Introdu datele de autentificare în formularul de mai jos</div>
        <div className={styles.errorMessage}>
        {
            isSubmitError ? <small>Aici va fi mesajul de "incorrect email or password"dupa implementare backend</small> : ''
        }
        </div>
        <form className={styles.form}>
            <FormField 
                type={"text"} 
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
        </form>
        <FormLink>Ai uitat parola?</FormLink>
        <FormLink>Nu ai un cont?</FormLink>
    </div>
    );
}

const FormLink = ({ href = '', children }) => {
    return (
        <div className={`${formStyles.linkWrapper} ${Inter500.className}`}> 
            <Link 
                href={href} 
                className={formStyles.link}
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

    }, [inputValue]);

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
                {isInputError ? inputError : ''}
            </div>
        </div>
    );
}