import Link from "next/link";
import styles from "./loginPage.module.css";
import '@/app/globals.css';
import { Inter700, Inter500, Inter600 } from '@/lib/fonts/Inter';




export default function Login() {

    return <div className={styles.loginContainer}>
        <div className={styles.formHeaderContainer}>
            <div className={styles.title + " " + Inter700.className}> Autentificare </div>
            <div className={styles.subtitle + " " + Inter500.className}>Introdu datele de autentificare în formularul de mai jos</div>
        </div>

        <form className={styles.form + " " + Inter600 .className}>
            <div className={styles.formLabel}>Email</div>
            <input type={"email"} className={"border-rounded" + " " + "border-gray"} placeholder={"exemplu@gmail.com"}></input>
            <div className={styles.formLabel}>Parola</div>
            <input type={"password"} className={"border-rounded" + " " + "border-gray"} placeholder={"*************"}></input>
            <button type={"submit"} className={styles.formButton + " " + "border-rounded" + " " + Inter600 .className}>Autentificare</button>
        </form>
        
        <div className={styles.linkWrapper + " " + Inter500.className}>
            <Link href={"google.com"} className={styles.link} >Ai uitat parola?</Link>
        </div>
        
        <div className={styles.linkWrapper  + " " + Inter500.className}> 
            <Link href={"google.com"} className={styles.link}>Nu ai un cont?</Link>
        </div>

    </div>;
}