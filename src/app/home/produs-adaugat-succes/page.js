'use client'

import styles from './produsAdaugatSucces.module.css';

export default function Page() {

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.message}>Produsul dumneavoastră a fost adăugat cu succes!</div>
      </div>
    </div>

  );
}