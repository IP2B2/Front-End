'use client';

import { useState } from 'react';
import styles from './RequestDetailsPopup.module.css';
import { Inter600, Inter500 } from '@/lib/fonts/Inter';

export default function RequestDetailsPopup({ onClose, requestData }) {
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <div className={styles.popupContent}>
          <div className={styles.popupHeader}>
            <h2 className={`${styles.popupTitle} ${Inter600.className}`}>Cerere #{requestData?.id || '1379'}</h2>
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </div>
          
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>Nume complet</label>
            <div className={styles.formInput}>
              <span className={`${styles.inputText} ${Inter500.className}`}>{requestData?.userFullName || 'Popescu Alexandru'}</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>Echipament</label>
            <div className={styles.formInput}>
              <a
                href="/home/echipamente/echipament"
                className={styles.productLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={`${styles.inputText} ${Inter500.className}`}>
                  Prelungitor 20M cu mâner
                </span>
              </a>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>Imagine echipament</label>
            <div className={styles.formInput}>
              <a
                href="/home/echipamente/echipament"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/Frame 1000005448.svg"
                  alt="Prelungitor 20M cu mâner"
                  className={styles.productImage}
                />
              </a>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>Tip acces</label>
            <div className={styles.formInput}>
              <span className={`${styles.inputText} ${Inter500.className}`}>Fizic</span>
            </div>
          </div>


          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>Data Incepere inchiriere</label>
            <div className={styles.formInput}>
              <span className={`${styles.inputText} ${Inter500.className}`}>22/05/2025</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>Data Finalizare inchiriere</label>
            <div className={styles.formInput}>
              <span className={`${styles.inputText} ${Inter500.className}`}>29/05/2025</span>
            </div>
          </div>

          {requestData?.isComplex && requestData?.pdfUrl && (
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${Inter600.className}`}>Proiect atașat</label>
              <div className={styles.formInput}>
                <a href={requestData.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.pdfLink}>
                  Descarcă PDF proiect
                </a>
              </div>
            </div>
          )}

          <div className={styles.statusContainer}>
            <span className={`${styles.statusLabel} ${styles[requestData?.status || 'pending']}`}>
              {requestData?.status === 'accepted' && 'Admisă'}
              {requestData?.status === 'rejected' && 'Respinsă'}
              {(!requestData?.status || requestData?.status === 'pending') && 'În așteptare'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}