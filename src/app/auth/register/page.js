// src/app/auth/register/page.js
'use client'; 

import { useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import styles from './register.module.css';
import Link from "next/link";
import { InterText } from '@/lib/fonts/Inter';
import { testValidEmail } from '@/lib/logic/AuthValidators';

function RegisterPage() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [matricol, setMatricol] = useState(''); 
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const validationError = testValidEmail(email);
    setEmailError(validationError);

    if (!validationError) {
      console.log("Register part 1 successful, redirecting...");
      router.push('/auth/extra-data-required'); 
    } else {
      console.log("Register part 1 validation failed");
    }
  };

  return (
    <div className={`${styles.formContainer} ${InterText.className}`}>
      <h1 className={styles.title}>Creeaza cont</h1>
      <p className={styles.subtitle}>
        Completeaza formularul de mai jos pentru a crea un cont
      </p>

      <form className={styles.form} onSubmit={handleSubmit}> { }
        <label className={styles.label}>
          Email
          <input
            type="email"
            placeholder="exemplu@info.uaic.ro"
            className={`${styles.input} ${emailError ? styles.inputError : ''}`} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className={styles.error}>{emailError}</span>} { }
        </label>

        <label className={styles.label}>
          Numar matricol
          <input
            type="text" 
            placeholder="Numar matricol" 
            className={styles.input} 
            value={matricol}
            onChange={(e) => setMatricol(e.target.value)}
          />
          { }
        </label>

        <button type="submit" className={styles.button}>
          Continua
        </button>

        <div className={styles.linkWrapper}> { }
            <Link
              href="/auth/login"
              className={styles.link} 
            >
              Ai deja un cont?
            </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
