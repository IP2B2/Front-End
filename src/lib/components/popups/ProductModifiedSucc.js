"use client";

import styles from './Popup.module.css';
import Image from "next/image";

export default function ProdustModifiedSucc({ open, onClose }) {
    if (!open) return null;

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupBox}>
                <button className={styles.xButton} onClick={onClose}>&#10005;</button>
                <div className={styles.popupContent}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/animated-characters/moshing.svg"
                            alt="Character"
                            width={250}
                            height={180}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <h2 className={styles.successTitle}>Echipamentul tău a fost modificat cu succes!</h2>
                    <p className={styles.successMessage}>
                        Modificările au fost salvate. Noul echipament actualizat este acum vizibil în listă.
                    </p>
                </div>
            </div>
        </div>
    );
}