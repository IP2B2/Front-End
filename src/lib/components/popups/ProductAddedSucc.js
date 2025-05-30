"use client";

import styles from './Popup.module.css';
import Image from "next/image";

export default function ProductAddedSucc({ open, onClose }) {
    if (!open) return null;

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupBox}>
                <button className={styles.xButton} onClick={onClose}>&#10005;</button>
                <div className={styles.popupContent}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/animated-characters/jumping.svg"
                            alt="Character"
                            width={250}
                            height={180}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <h2 className={styles.successTitle}>Echipament adăugat cu succes!</h2>
                    <p className={styles.successMessage}>
                        Ai adăugat echipamentul cu succes! Acesta va fi disponibil imediat în lista de echipamente.
                    </p>
                </div>
            </div>
        </div>
    );
}