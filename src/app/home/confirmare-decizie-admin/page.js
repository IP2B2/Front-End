'use client'

import styles from './confirmDecisionAdmin.module.css';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.back(); //de modificat cand se implementeaza pagina de administrare utilizatori
    }, 7000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.message}>Răspunsul dvs. a fost înregistrat</div>
      </div>
    </div>
    
  );
}
