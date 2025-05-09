'use client'
import styles from './Echipament.module.css';
import { useEffect } from 'react';
import { useLayoutContent } from '@/lib/context';
import Image from 'next/image';

export default function EchipamentPage() {

    const { setExtraContent } = useLayoutContent();

    useEffect(() => {
      setExtraContent({
        pageTitle: 'Prelungitor Gri'
      });
      return () => setExtraContent({ pageTitle: '' }); // Cleanup when navigating away
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
            <div className={styles.layout}>
                <div className={styles.pageTitleContainer}>
                    <Image
                        src="/icons/back-arrow.svg"
                        alt="Back"
                        width={20}
                        height={20}
                    />
                </div>
                <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.image}>
                            <Image
                                src="/icons/Frame 1000005448.svg"
                                alt="Prelungitor Gri"
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={styles.overlay}>
                            <span className={styles.overlayText}>FEEA</span>
                        </div>
                    </div>
                </div>

                <div className={styles.toggleContainer}>
                    <button className={`${styles.toggleButton} ${styles.activeToggle}`}>
                        Basic
                    </button>
                    <button className={`${styles.toggleButton} ${styles.disabledToggle}`} disabled>
                        Complex
                    </button>
                </div>

                <div className={styles.descriptionContainer}>
                    <div className={styles.pageDescription}>
                    Prelungitor gri cu 5 prize Schuko, cablu de 1.5 metri și întrerupător iluminat pentru control ușor. Suportă o putere maximă de 3680W și este ideal pentru utilizare casnică sau birou. Design compact, cu protecție la supratensiune integrată.
                    </div>
                    <div className={styles.buttonGroup}>
                        <button className={styles.actionButton}>Vezi disponibilitate</button>
                        <button className={styles.actionButton}>Inchiriaza</button>
                    </div>
                    <div className={styles.dropdownsContainer}>
                        <details className={styles.dropdown}>
                            <summary className={styles.dropdownHeader}>Mod de utilizare</summary>
                            <div className={styles.dropdownContent}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec ullamcorper diam, nec maximus lorem.
                            </div>
                        </details>
                        
                        <details className={styles.dropdown}>
                            <summary className={styles.dropdownHeader}>Material si intretinere</summary>
                            <div className={styles.dropdownContent}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec ullamcorper diam, nec maximus lorem.
                            </div>
                        </details>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}