'use client';

import styles from "./registerPage.module.css";
import '@/app/globals.css';
import { Inter700, Inter500, Inter600 } from '@/lib/fonts/Inter';
import { useRouter } from 'next/navigation'; 

export default function ExtraDataRequired() {
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        router.push('/home'); 
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.formHeaderContainer}>
                <div className={styles.title + " " + Inter700.className}>Mai avem nevoie de date</div>
                <div className={styles.subtitle + " " + Inter500.className}>Introdu datele tale în formularul de mai jos pentru a finaliza crearea contului</div>
            </div>

            <form className={styles.form + " " + Inter600.className} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <div className={styles.formLabel}>Prenume</div>
                        <input type="text" className={"border-rounded" + " " + "border-gray" + " " + Inter500.className} placeholder="ex: Alexandru"></input>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.formLabel}>Nume de familie</div>
                        <input type="text" className={"border-rounded" + " " + "border-gray" + " " + Inter500.className} placeholder="ex: Popescu"></input>
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <div className={styles.formLabel}>Rol</div>
                        <input type="text" className={"border-rounded" + " " + "border-gray" + " " + Inter500.className} placeholder="ex: student"></input>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.formLabel}>Facultate</div>
                        <input type="text" className={"border-rounded" + " " + "border-gray" + " " + Inter500.className} placeholder="ex: Facultatea de informatica Iasi"></input>
                    </div>
                </div>

                <div className={styles.formLabel}>Parola</div>
                <input type="password" className={"border-rounded" + " " + "border-gray" + " " + Inter500.className} placeholder="***************"></input>
                
                <div className={styles.formLabel}>Confirmare parola</div>
                <input type="password" className={"border-rounded" + " " + "border-gray" + " " + Inter500.className} placeholder="***************"></input>
                
                <button type="submit" className={styles.formButton + " " + "border-rounded" + " " + Inter500.className} onClick={handleSubmit}>Finalizeaza</button>
            </form>
        </div>
    );
}