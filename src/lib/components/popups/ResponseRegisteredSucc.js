"use client";

import styles from './Popup.module.css';
import Image from "next/image";

export default function ResponseRegisteredSucc({ open, onClose }) {
    if (!open) return null;

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupBox}>
                <button className={styles.xButton} onClick={onClose}>&#10005;</button>
                <div className={styles.popupContent}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/animated-characters/loving.svg"
                            alt="Character"
                            width={250}
                            height={180}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <h2 className={styles.successTitle}>Răspunsul tău a fost înregistrat cu succes!</h2>
                    <p className={styles.successMessage}>
                        Răspunsul trimis a fost salvat. Acesta va fi luat în considerare de către echipă în cel mai scurt timp.
                    </p>
                </div>
            </div>
        </div>
    );
}