'use client';

import { useEffect, useState } from "react";

import Link from "next/link";

import styles from "./loginPage.module.css";
import '@/app/globals.css';
import { Inter700, Inter500, Inter600 } from '@/lib/fonts/Inter';

import { testValidEmail, testValidPasswordCharacters, testValidPasswordLength } from "@/lib/logic/AuthValidators";

export default function Login() {
    
    const [emailField, setEmailField] = useState("initialValue");
    const [passwordField, setPasswordField] = useState("initialValuePassword");

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const [isPasswordLengthError, setIsPasswordLengthError] = useState(true);

    const [isError, setIsError] = useState(false);
    const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);

    const checkValidData = () => {
        if(hasSubmittedOnce == false)
            return;
        setIsValidEmail(testValidEmail(emailField));
        setIsValidPassword(testValidPasswordCharacters(passwordField) 
                      && testValidPasswordLength(passwordField));
        setIsPasswordLengthError(testValidPasswordLength(passwordField));
    }

    const handleSubmitClick = (ev) => {
        ev.preventDefault();
        setHasSubmittedOnce(true);
        checkValidData();
        setIsError(!isError);
    }
    const handleInputChange = useEffect(() => {
        checkValidData();
    }, [emailField, passwordField]);

    const handleSubmittedChange = useEffect(() => {
        checkValidData();
    }, [hasSubmittedOnce]);

    return <div className={styles.loginContainer}>
        <div className={styles.formHeaderContainer}>
            <div className={styles.title + " " + Inter700.className}> Autentificare </div>
            <div className={styles.subtitle + " " + Inter500.className}>Introdu datele de autentificare în formularul de mai jos</div>
        </div>
        {
            isError ? <div><small>Aici va fi mesajul de</small> "incorrect email or password" <small>dupa implementare backend</small></div> : ''
        }
        <form className={styles.form + " " + Inter600 .className}>

            <div className={styles.formLabel}>Email</div>
            <input type={"email"} className={"border-rounded" + " " + "border-gray" 
                + (!isValidEmail == true ? " " + styles.errorInput : '')
            } placeholder={"exemplu@gmail.com"}
                onChange={(event) => { setEmailField(event.target.value.trim()); }}></input>
            <div className={styles.errorMessage}>
            {
                !isValidEmail ? "Email invalid": ""
            }
            </div>
            <div className={styles.formLabel}>Parola</div>
            <input type={"password"} className={"border-rounded" + " " + "border-gray"
                + (!isValidPassword == true ? " " + styles.errorInput : '')
            } placeholder={"*************"}
                onChange={(event) => { setPasswordField(event.target.value.trim()); }}></input>
            <div  className={styles.errorMessage}>
            {
                !isValidPassword 
                    ? (!isPasswordLengthError ? "Lungime parola incorecta" : "Parola contine caractere invalide")
                    : ""
            }
            </div>
            <button type={"submit"} onClick={handleSubmitClick} className={styles.formButton + " " + "border-rounded" + " " + Inter600 .className}
                >Autentificare</button>

        </form>
        
        <div className={styles.linkWrapper + " " + Inter500.className}>
            <Link href={"google.com"} className={styles.link} >Ai uitat parola?</Link>
        </div>
        
        <div className={styles.linkWrapper  + " " + Inter500.className}> 
            <Link href={"google.com"} className={styles.link}>Nu ai un cont?</Link>
        </div>

    </div>;
}