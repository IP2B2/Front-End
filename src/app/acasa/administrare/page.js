'use client'

import Image from 'next/image';
import Link from 'next/link';

import '@/app/globals.css'
import styles from './administrarePage.module.css'
import { Montserrat800 } from '@/lib/fonts/Montserrat';

import { useEffect } from 'react';
import { useLayoutContent } from '@/lib/context';

export default function Administrare() {
  const { setExtraContent } = useLayoutContent();
  
  useEffect(() => {
    setExtraContent({
      pageTitle: ''
    });
    return () => setExtraContent({ pageTitle: '' }); // Cleanup when navigating away
  }, [setExtraContent]);

  return (
    <div className={styles.administrareContainer}>
      <div className={`${styles.card} ${styles.cardEchipamente}`}>
        <div className={`${styles.cardTitle} ${Montserrat800.className}`}>
          Administrare Echipamente
        </div>
        <div className={styles.cardImage}>
          <Image
            src="/icons/administrare_echipamente.svg"
            width={250}
            height={250}
            alt="Administrare Echipamente"
          />
        </div>
        <div className={styles.buttonContainer}>
          <Link href="/acasa/administrare/echipamente" className={`${styles.button} ${styles.buttonEchipamente} ${Montserrat800.className}`}>
            Mai departe
          </Link>
        </div>
      </div>
      
      <div className={`${styles.card} ${styles.cardUtilizatori}`}>
        <div className={`${styles.cardTitle} ${Montserrat800.className}`}>
          Administrare utilizatori
        </div>
        <div className={styles.cardImage}>
          <Image
            src="/icons/administrare_utilizatori.svg"
            width={250}
            height={250}
            alt="Administrare Utilizatori"
          />
        </div>
        <div className={styles.buttonContainer}>
          <Link href="/acasa/administrare/utilizatori" className={`${styles.button} ${styles.buttonUtilizatori} ${Montserrat800.className}`}>
            Mai departe
          </Link>
        </div>
      </div>
    </div>
  );
} 