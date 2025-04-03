import Link from "next/link";
import styles from "./loginPage.module.css";
import '@/app/globals.css';

export default function PasswordReset() {

    return <div>
        <div className={styles.title}> Autentificare </div>
        <div className={styles.subtitle}>Introdu datele de autentificare în formularul de mai jos</div>
        
        <form className={styles.form}>
            <div className={styles.formLabel}>Email</div>
            <input type={"email"} placeholder={"exemplu@gmail.com"}></input>
            <div className={styles.formLabel}>Parola</div>
            <input type={"password" + " " + "border-rounded"} placeholder={"*************"}></input>
            <button type={"submit" + " " + "border-rounded"} className={styles.formButton}>Autentificare</button>
        </form>
        <Link href={"google.com"} className={styles.link + " " + "faded"} >Ai uitat parola?</Link>
        <Link href={"google.com"} className={styles.link + " " + "faded"}>Nu ai un cont?</Link>

    </div>;
}