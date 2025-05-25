"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ProductEditPopup.module.css';
import { Inter500, Inter600 } from '@/lib/fonts/Inter';

export default function ProductEditPopup({ onClose, onDelete, onSave, productData }) {
  const [isClient, setIsClient] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [formData, setFormData] = useState({
    numeProdus: '',
    descriere: '',
    modUtilizare: '',
    materialSiIntretinere: '',
    status: 'Disponibil',
    imagini: []
  });
  
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Status options
  const statusOptions = ['Disponibil', 'În folosință', 'În mentenanță'];

  useEffect(() => {
    setIsClient(true);
    
    if (productData) {
      setFormData({
        numeProdus: productData.numeProdus || '',
        descriere: productData.descriere || '',
        modUtilizare: productData.modUtilizare || '',
        materialSiIntretinere: productData.materialSiIntretinere || '',
        status: productData.status || 'Disponibil',
        imagini: productData.imagini || []
      });
      
      if (productData.imagini && productData.imagini.length > 0) {
        setPreviewImages(productData.imagini);
      }
    }
  }, [productData]);

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
    if (window.confirm('Sunteți sigur că doriți să ștergeți acest produs?')) {
      if (onDelete) {
        onDelete(productData.id);
      }
    }
  };

  const goToPreviousImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNextImage = () => {
    if (selectedImageIndex < previewImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <div className={styles.popupHeader}>
          <h2 className={`${styles.popupTitle} ${Inter600.className}`}>Editare produs</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.popupContent}>
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Nume produs</label>
            <input
              type="text"
              name="numeProdus"
              value={formData.numeProdus}
              onChange={handleChange}
              className={styles.textInput}
              placeholder="Nume produs"
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Status produs</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={styles.textInput}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          {previewImages.length > 0 && (
            <div className={styles.imageSection}>
              <label className={`${styles.fieldLabel} ${Inter600.className}`}>Imagini produs</label>
              <div className={styles.mainImage}>
                <div className={styles.imageNavFlexContainer}>
                  <button className={styles.imageNavButton} onClick={goToPreviousImage}>&#10094;</button>
                  <Image 
                    src={previewImages[selectedImageIndex]}
                    alt={`Imagine produs ${selectedImageIndex + 1}`}
                    width={400}
                    height={300}
                    className={styles.productImage}
                    unoptimized={previewImages[selectedImageIndex].startsWith('data:')}
                  />
                  <button className={styles.imageNavButton} onClick={goToNextImage}>&#10095;</button>
                </div>
              </div>
              
              <div className={styles.imageCounter}>
                Imagine {selectedImageIndex + 1} din {previewImages.length}
              </div>
            </div>
          )}
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Descriere produs</label>
            <textarea
              name="descriere"
              value={formData.descriere}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Descriere produs"
              rows={4}
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Mod de utilizare</label>
            <textarea
              name="modUtilizare"
              value={formData.modUtilizare}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Mod de utilizare"
              rows={4}
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Material și întreținere</label>
            <textarea
              name="materialSiIntretinere"
              value={formData.materialSiIntretinere}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Material și întreținere"
              rows={4}
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