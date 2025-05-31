'use client';

import { useState } from 'react';
import styles from './ProductRequestPopup.module.css';
import { Inter600, Inter500 } from '@/lib/fonts/Inter';
import Image from 'next/image';

export default function ProductRequestPopup({ onClose, userData, onApprove, onReject }) {
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isUsageChecked, setIsUsageChecked] = useState(false);
  const [isMaintenanceChecked, setIsMaintenanceChecked] = useState(false);
  const [isResponsibilityChecked, setIsResponsibilityChecked] = useState(false);

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <div className={styles.popupContent}>
          <div className={styles.popupHeader}>
            <h2 className={`${styles.popupTitle} ${Inter600.className}`}>Cerere #{userData?.id || '1379'}</h2>
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </div>
          
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>Nume complet</label>
            <div className={styles.formInput}>
              <span className={`${styles.inputText} ${Inter500.className}`}>{userData?.fullName || 'Popescu Alexandru'}</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>Nume echipament</label>
            <div className={styles.formInput}>
              <a
                href="/home/echipamente/echipament"
                className={`${styles.inputText} ${Inter500.className}`}
                style={{ cursor: 'pointer', textDecoration: 'none' }} 
              >
                Prelungitor 20M cu mâner
              </a>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>Imagine echipament</label>
            <div className={styles.formInput}>
              <a href="/home/echipamente/echipament">
                <Image
                  src="/icons/Frame 1000005448.svg"
                  alt="..."
                  width={80}
                  height={80}
                  className={styles.customProductImage}
                />
              </a>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>Data Incepere inchiriere</label>
            <div className={styles.formInput}>
              <span className={`${styles.inputText} ${Inter500.className}`}>
                {userData?.rentalStartDate || '22/05/2025'}
              </span>
            </div>
          </div>
                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${Inter600.className}`}>Data Finalizare inchiriere</label>
                  <div className={styles.formInput}>
                    <span className={`${styles.inputText} ${Inter500.className}`}>
                      {userData?.rentalEndDate || '29/05/2025'}
                    </span>
                  </div>
                </div>

                {userData?.isComplex && userData?.pdfUrl && (
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${Inter600.className}`}>Proiect atașat</label>
              <div className={styles.formInput}>
                <a href={userData.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.pdfLink}>
                  Descarcă PDF proiect
                </a>
              </div>
            </div>
          )}

          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                className={styles.checkbox}
                checked={isAcknowledged}
                onChange={() => setIsAcknowledged(!isAcknowledged)}
              />
              <span className={styles.checkmark}></span>
              <span className={`${styles.checkboxText} ${Inter500.className}`}>
                Declar că am luat la cunoștință toate informațiile referitoare la cererea depusă de utilizator.
              </span>
            </label>
          </div>

          <div className={styles.buttonGroup}>
            <button 
              className={`${styles.approveButton} ${Inter600.className}`}
              onClick={() => onApprove(userData?.id)}
              disabled={!isAcknowledged}
            >
              Acceptă
            </button>
            <button 
              className={`${styles.rejectButton} ${Inter600.className}`}
              onClick={() => onReject(userData?.id)}
              disabled={!isAcknowledged}
            >
              Refuză
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductRequestPopup as RoleRequestPopup };