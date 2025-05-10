'use client';

import { useRouter } from 'next/navigation';
import styles from './confirmResetPass.module.css';

export default function PasswordResetSuccessPage() {
   const router = useRouter();

   const handleGoBack = () => {
       router.push('../auth/login');
   };

   return (
       <div className={styles.pageContainer}>
           <div className={styles.successContainer}>
               <h1 className={styles.pageTitle}>Parolă resetată</h1>
               <p className={styles.pageDescription}>
                   Parola dumneavoastră a fost resetată cu succes! Acum vă puteți întoarce la pagina de start a aplicației ISMA.
               </p>

               <button 
                   onClick={handleGoBack}
                   className={styles.successButton}
               >
                   Înapoi
               </button>
           </div>
       </div>
   );
}