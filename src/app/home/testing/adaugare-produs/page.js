"use client";

import { useState } from "react";
import styles from './productAddedSuccessfully.module.css';
import Image from "next/image";

export default function PaginaPopup() {
  const [popupDeschis, setPopupDeschis] = useState(false);
  /*pot face ca un click in afara popupului sa dea exit din popup/////////////////////////////////////////////////*/
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <h1>test popup</h1>
        <button onClick={() => setPopupDeschis(true)}>Deschide popup</button>

        {popupDeschis && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupBox}>
              <button
                className={styles.xButton}
                onClick={() => setPopupDeschis(false)}
              >
                &#10005;
              </button>

              <div className={styles.popupContent}>
                <div className={styles.imageWrapper}>
                  <Image src="/animated-characters/jumping.svg"
                    alt="Character"
                    fill
                    style={{ objectFit: "contain" }}

                  />
                </div>
                <h2 className={styles.successTitle}>Produs adăugat cu succes!</h2>
                <p className={styles.successMessage}>
                  Ai adăugat produsul cu succes! Acesta va fi disponibil imediat în lista de produse
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
