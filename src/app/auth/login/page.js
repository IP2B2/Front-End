import Link from "next/link";
import styles from "./loginPage.module.css";
import '@/app/globals.css';
import { InterHeading, InterText,  InterEmphasis} from '@/lib/fonts/Inter';

export default function PasswordReset() {

    return <div className={styles.loginContainer}>
        <div className={styles.title + " " + InterHeading.className}> Autentificare </div>
        <div className={styles.subtitle + " " + InterText.className}>Introdu datele de autentificare în formularul de mai jos</div>
        
        <form className={styles.form + " " + InterEmphasis.className}>
            <div className={styles.formLabel}>Email</div>
            <input type={"email"} className={"border-rounded" + " " + "border-gray"} placeholder={"exemplu@gmail.com"}></input>
            <div className={styles.formLabel}>Parola</div>
            <input type={"password"} className={"border-rounded" + " " + "border-gray"} placeholder={"*************"}></input>
            <button type={"submit"} className={styles.formButton + " " + "border-rounded"}>Autentificare</button>
        </form>
        <div className={styles.linkWrapper + " " + InterText.className}>
            <Link href={"google.com"} className={styles.link} >Ai uitat parola?</Link>
        </div>
        
        <div className={styles.linkWrapper  + " " + InterText.className}> 
            <Link href={"google.com"} className={styles.link}>Nu ai un cont?</Link>
        </div>

    </div>;
}