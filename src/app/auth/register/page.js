// src/app/auth/register/page.js

import styles from './register.module.css';
import Link from "next/link";

function RegisterPage() {
  return (
    <div className={styles.formContainer}>
      
      {/* Titluri */}
      <h1 className={styles.title}>Creeaza cont</h1>
      <p className={styles.subtitle}>
        Completeaza formularul de mai jos pentru a crea un cont
      </p>

      {/* Formular */}
      <form className={styles.form}>
        
        {/* Câmpul de Email */}
        <label className={styles.label}>
          Email
          <input
            type="email"
            placeholder="exemplu@info.uaic.ro"
            className={styles.input}
          />
        </label>
        
        {/* Câmpul de Numar Matricol */}
        <label className={styles.label}>
          Numar matricol
          <input
            type="password"
            className={styles.input}
          />
        </label>

        {/* Butonul de Submit */}
        <button type="submit" className={styles.button}>
          Creeaza cont
        </button>

        {/* Link pentru utilizatori deja înregistrați */}
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
