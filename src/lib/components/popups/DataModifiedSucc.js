"use client";

import styles from './Popup.module.css';
import Image from "next/image";

export default function DataModifiedSucc({ open, onClose }) {
    if (!open) return null;

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupBox}>
                <button className={styles.xButton} onClick={onClose}>&#10005;</button>
                <div className={styles.popupContent}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/animated-characters/coffee.svg"
                            alt="Character"
                            width={250}
                            height={180}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <h2 className={styles.successTitle}>Datele utilizatorului au fost modificate cu succes!</h2>
                    <p className={styles.successMessage}>
                        Modificările au fost aplicate cu succes. Datele actualizate ale utilizatorului sunt acum salvate.
                    </p>
                </div>
            </div>
        </div>
    );
}