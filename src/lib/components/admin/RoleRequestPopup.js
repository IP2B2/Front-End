'use client';

import { useState } from 'react';
import styles from './RoleRequestPopup.module.css';
import { Inter600, Inter500 } from '@/lib/fonts/Inter';

export default function RoleRequestPopup({ onClose, userData, onApprove, onReject }) {
  const [isAcknowledged, setIsAcknowledged] = useState(false);

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
            <label className={`${styles.formLabel} ${Inter600.className}`}>Facultate și profil</label>
            <div className={styles.formInput}>
              <span className={`${styles.inputText} ${Inter500.className}`}>{userData?.faculty || 'Facultatea de Informatică'}</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>An, grupă, semi-an</label>
            <div className={styles.formInput}>
              <span className={`${styles.inputText} ${Inter500.className}`}>{userData?.yearAndGroup || 'Anul 3, Grupa B2, Semestrul 1'}</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>CNP</label>
            <div className={styles.formInput}>
              <span className={`${styles.inputText} ${Inter500.className}`}>{userData?.cnp || '1234567890123'}</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${Inter600.className}`}>Rol</label>
            <div className={styles.formInput}>
              <span className={`${styles.inputText} ${Inter500.className}`}>{userData?.role || 'Student'}</span>
            </div>
          </div>

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