"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import styles from './ProductEditPopup.module.css';
import { Inter500, Inter600 } from '@/lib/fonts/Inter';

import { getEquipmentById } from '@/app/home/administrare/echipamente/getEquipmentById';
import { updateEquipmentById, deleteEquipmentById } from '@/lib/service/EquipmentService';
import { getAuthToken } from '@/lib/getAuthToken';

export default function ProductEditPopup({ onClose, onDelete, onSave, productData, equipmentId }) {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    usage: '',
    material: '',
    status: 'Disponibil',
    photo: []
  });
  const [equipment, setEquipment] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const handleEqSave = async (data) => {
    let eq = {
      id: equipmentId,
      inventoryNumber: equipment.inventoryNumber,
      laboratoryId: equipment.laboratoryId,
      availabilityStatus: "AVAILABLE",
      ...formData
    }
    console.log("handleEqSave called with data:", eq);
    delete eq.status;
    await updateEquipmentById(getAuthToken(), eq);
    router.refresh();
  }

  useEffect(() => { 
    if(equipment) {
      let reqJson = {
        description: '',
        usage: '',
        material: ''
      };
      try {
        reqJson = JSON.parse(equipment.accessRequirements);
      } catch (error) {console.log("default");}

      setFormData({
        name: equipment.name || '',
        description: equipment.description || '',
        usage: equipment.usage || '',
        material: equipment.material || '',
        status: equipment.availabilityStatus || 'Disponibil',
        photo: equipment.photo || []
      });
    }
  }, [equipment]);

  useEffect(() => {
      async function fetchEquipment() {
        try {
          const data = await getEquipmentById({ id: equipmentId, token: localStorage.getItem('authToken') });
          setEquipment(data);
        } catch (error) {
          console.error("Error fetching equipment:", error);
        }
      }
  
      fetchEquipment();
    }, [equipmentId]);


  // Status options
  const statusOptions = ['Disponibil', 'În folosință', 'În mentenanță'];

  useEffect(() => {
    setIsClient(true);
    
    

    if (productData) {
      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        usage: productData.usage || '',
        material: productData.material || '',
        status: productData.status || 'Disponibil',
        photo: productData.photo || []
      });
      
      if (productData.photo && productData.photo.length > 0) {
        setPreviewImages(productData.photo);
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
    if (isModified) {
      handleEqSave();
    
    }
  };
  const doRefresh = useCallback(() => {
    router.push('/home/administrare/echipamente');
  }, [router]);

  const handleDelete = async () => {

      deleteEquipmentById(getAuthToken(), equipmentId);
      setTimeout(doRefresh, 1000);
      onDelete();
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
          <h2 className={`${styles.popupTitle} ${Inter600.className}`}>Editare echipament</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.popupContent}>
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Nume echipament</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.textInput}
              placeholder="Nume echipament"
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Status echipament</label>
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
              <label className={`${styles.fieldLabel} ${Inter600.className}`}>photo echipament</label>
              <div className={styles.mainImage}>
                <div className={styles.imageNavFlexContainer}>
                  <button className={styles.imageNavButton} onClick={goToPreviousImage}>&#10094;</button>
                  <Image 
                    src={previewImages[selectedImageIndex]}
                    alt={`Imagine echipament ${selectedImageIndex + 1}`}
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
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>description echipament</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="description echipament"
              rows={4}
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Mod de utilizare</label>
            <textarea
              name="usage"
              value={formData.usage}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Mod de utilizare"
              rows={4}
            />
          </div>
          
          <div className={styles.formField}>
            <label className={`${styles.fieldLabel} ${Inter600.className}`}>Material și întreținere</label>
            <textarea
              name="material"
              value={formData.material}
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