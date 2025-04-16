// src/app/auth/register/page.js
'use client'
import { useState, useEffect } from 'react';

import styles from './register.module.css';
import Link from "next/link";
import { InterText } from '@/lib/fonts/Inter';
import { testValidEmail, testValidMatricol } from '@/lib/logic/AuthValidators';

function RegisterPage() {

  const [emailField, setEmailField] = useState('');
  const [matricolField, setMatricolField] = useState('');
  const [showError, setShowError] = useState(false);
  const [showMatricolError, setShowMatricolError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [matricolErrorMessage, setMatricolErrorMessage] = useState('');
  const [hasSubmitted, setHasSumbitted] = useState(false);

  const onEmailChange = (event)=>{
    setEmailField(event.target.value);
    let mesaj = testValidEmail(event.target.value);
    setShowError(!!mesaj);
    setErrorMessage(mesaj);
  }

  const onMatricolChange = (event)=>{
    setMatricolField(event.target.value);
    let messageInvalidMatricol = testValidMatricol(event.target.value);
    setShowMatricolError(!!messageInvalidMatricol);
    setMatricolErrorMessage(messageInvalidMatricol);
  }
  
  const handleSubmit = (event)=>{
    event.preventDefault();
    setHasSumbitted(true);
  }

  return (
    <div className={`${styles.formContainer} ${InterText.className}`}>
      
      <h1 className={styles.title}>Creeaza cont</h1>
      <p className={styles.subtitle}>
        Completeaza formularul de mai jos pentru a crea un cont
      </p>

      <form className={styles.form}>
        <label className={styles.label}>
          Email
          <input 
            type="email"
            placeholder="exemplu@info.uaic.ro"
            className={styles.input + " " + (showError && hasSubmitted ? styles.inputError : '')}
            onChange={onEmailChange}
          />
            <div className={styles.error}>
              {
                showError && hasSubmitted ?
                errorMessage
                :''
              }
            </div>
        </label>
        
        <label className={styles.label}>
          Numar matricol
          <input
            type="password"
            className={styles.input + " " + (showMatricolError && hasSubmitted ? styles.inputError : '')}
            onChange={onMatricolChange}
          />
          <div className={styles.error}>
            {
              showMatricolError && hasSubmitted ?
              matricolErrorMessage
              :''
            }
          </div>
        </label>

        <button 
          type="submit" 
          className={styles.button}
          onClick={handleSubmit}
        >
          Creeaza cont
        </button>

        <Link
          href="https://google.com"
          className={styles.loginHint}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ai deja un cont?
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
