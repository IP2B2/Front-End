import { Inter600 } from '@/lib/fonts/Inter';
import Image from 'next/image';
import styles from './UserDetailsPopup.module.css';

export default function UserDetailsPopup({ open, onClose, userData }) {
  if (!open) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &#10005;
        </button>
        
        <h2 className={`${styles.popupTitle} ${Inter600.className}`}>
          Detalii utilizator
        </h2>
        
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nume</label>
          <div className={styles.formValue}>{userData?.nume || '-'}</div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Prenume</label>
          <div className={styles.formValue}>{userData?.prenume || '-'}</div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Facultate</label>
          <div className={styles.formValue}>{userData?.facultate || '-'}</div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Profil</label>
          <div className={styles.formValue}>{userData?.profil || '-'}</div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>An</label>
          <div className={styles.formValue}>{userData?.an || '-'}</div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Grupa</label>
          <div className={styles.formValue}>{userData?.grupa || '-'}</div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nr. matricol</label>
          <div className={styles.formValue}>{userData?.nrMatricol || '-'}</div>
        </div>
    
      </div>
    </div>
  );
}