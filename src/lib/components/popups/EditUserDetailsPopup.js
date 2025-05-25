"use client";

import { useState, useEffect } from 'react';
import styles from './EditUserDetailsPopup.module.css';
import { Inter500, Inter600 } from '@/lib/fonts/Inter';

export default function EditUserDetailsPopup({ open, onClose, onSave, onDelete, userData }) {
  const [isModified, setIsModified] = useState(false);
  const [formData, setFormData] = useState({
    nume: '',
    prenume: '',
    facultate: '',
    profil: '',
    an: '',
    grupa: '',
    nrMatricol: '',
  });

  useEffect(() => {
    if (userData && open) {
      setFormData({
        nume: userData.nume || '',
        prenume: userData.prenume || '',
        facultate: userData.facultate || '',
        profil: userData.profil || '',
        an: userData.an || '',
        grupa: userData.grupa || '',
        nrMatricol: userData.nrMatricol || '',
      });
      setIsModified(false);
    }
  }, [userData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsModified(true);
  };

  const handleSave = () => {
    if (onSave && isModified) {
      onSave(formData);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Sunteți sigur că doriți să ștergeți acest utilizator?')) {
      if (onDelete) {
        onDelete(userData.id);
      }
    }
  };

  if (!open) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <div className={styles.popupHeader}>
          <h2 className={`${styles.popupTitle} ${Inter600.className}`}>Editare utilizator</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.popupContent}>
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Nume</label>
            <input
              type="text"
              name="nume"
              value={formData.nume}
              onChange={handleChange}
              className={styles.textInput}
              placeholder="Nume"
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Prenume</label>
            <input
              type="text"
              name="prenume"
              value={formData.prenume}
              onChange={handleChange}
              className={styles.textInput}
              placeholder="Prenume"
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Facultate</label>
            <input
              type="text"
              name="facultate"
              value={formData.facultate}
              onChange={handleChange}
              className={styles.textInput}
              placeholder="Facultate"
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Profil</label>
            <input
              type="text"
              name="profil"
              value={formData.profil}
              onChange={handleChange}
              className={styles.textInput}
              placeholder="Profil"
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>An</label>
            <input
              type="text"
              name="an"
              value={formData.an}
              onChange={handleChange}
              className={styles.textInput}
              placeholder="An"
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Grupa</label>
            <input
              type="text"
              name="grupa"
              value={formData.grupa}
              onChange={handleChange}
              className={styles.textInput}
              placeholder="Grupa"
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Nr. matricol</label>
            <input
              type="text"
              name="nrMatricol"
              value={formData.nrMatricol}
              onChange={handleChange}
              className={styles.textInput}
              placeholder="Nr. matricol"
            />
          </div>
          
          <div className={styles.buttonGroup}>
            <button 
              className={styles.deleteButton} 
              onClick={handleDelete}
              type="button"
            >
              Șterge
            </button>
            
            <button 
              className={`${styles.saveButton} ${isModified ? styles.activeButton : ''}`} 
              onClick={handleSave}
              disabled={!isModified}
              type="button"
            >
              Modifică
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}