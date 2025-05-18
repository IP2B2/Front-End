'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './formAdaugareProdus.module.css';
import { BackArrow } from '@/lib/components/globals/NavArrows';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  // Flag pentru a determina dacă suntem pe client
  const [isClient, setIsClient] = useState(false);
  
  const [formData, setFormData] = useState({
    numeProdus: '',
    descriere: '',
    modUtilizare: '',
    materialSiIntretinere: '',
    imagini: []
  });

  const allFieldsFilled = 
    formData.numeProdus.trim() !== '' && 
    formData.descriere.trim() !== '' && 
    formData.modUtilizare.trim() !== '' && 
    formData.materialSiIntretinere.trim() !== '' &&
    formData.imagini.length > 0;

  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const [startThumbnailIndex, setStartThumbnailIndex] = useState(0);
  const maxVisibleThumbnails = 5;
  
  // Setăm flag-ul isClient după prima renderizare
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Încărcăm datele din sessionStorage doar după ce componentul este montat pe client
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const savedFormData = sessionStorage.getItem('productFormData');
      const savedImageUrls = sessionStorage.getItem('productImageUrls');
      
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData(prev => ({
          ...prev,
          numeProdus: parsedData.numeProdus || '',
          descriere: parsedData.descriere || '',
          modUtilizare: parsedData.modUtilizare || '',
          materialSiIntretinere: parsedData.materialSiIntretinere || '',
          imagini: []
        }));
      }
      
      if (savedImageUrls) {
        const parsedUrls = JSON.parse(savedImageUrls);
        setPreviewImages(parsedUrls);
        setFormData(prev => ({
          ...prev,
          imagini: Array(parsedUrls.length).fill('placeholder-image')
        }));
      }
    } catch (error) {
      console.error('Eroare la încărcarea datelor din sessionStorage:', error);
      if (isClient) {
        sessionStorage.removeItem('productFormData');
        sessionStorage.removeItem('productImageUrls');
      }
    }
  }, [isClient]);
  
  // Salvăm datele în sessionStorage când se modifică
  useEffect(() => {
    if (!isClient) return;
    
    const formDataToSave = {
      numeProdus: formData.numeProdus,
      descriere: formData.descriere,
      modUtilizare: formData.modUtilizare,
      materialSiIntretinere: formData.materialSiIntretinere,
    };
    
    sessionStorage.setItem('productFormData', JSON.stringify(formDataToSave));
    
    if (previewImages.length > 0) {
      sessionStorage.setItem('productImageUrls', JSON.stringify(previewImages));
    } else {
      sessionStorage.removeItem('productImageUrls');
    }
  }, [isClient, formData.numeProdus, formData.descriere, formData.modUtilizare, formData.materialSiIntretinere, previewImages]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Funcție pentru debounce
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Funcție pentru validarea tipului de fișier
  const isValidImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
  };

  const processImages = async (files) => {
    if (isUploading) return; // Evităm procesarea multiplă
    
    // Verificăm dacă avem fișiere valide
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const validFiles = Array.from(files).filter(isValidImageFile);
      
      if (validFiles.length === 0) {
        alert('Selectați doar fișiere de tip imagine (JPG, PNG, GIF, WEBP).');
        return;
      }
      
      if (validFiles.length !== files.length) {
        alert('Unele fișiere au fost ignorate deoarece nu sunt imagini.');
      }
      
      // Verificăm limita de 3 imagini
      const totalImageCount = formData.imagini.length + validFiles.length;
      
      if (totalImageCount > 3) {
        alert('Puteți adăuga maximum 3 imagini.');
        return;
      }
      
      const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };
      
      const newBase64Images = await Promise.all(validFiles.map(readFileAsBase64));
      const updatedPreviews = [...previewImages, ...newBase64Images];
      
      setPreviewImages(updatedPreviews);
      setFormData(prev => ({
        ...prev,
        imagini: [...prev.imagini, ...validFiles]
      }));
      
      setSelectedImageIndex(previewImages.length);
    } catch (error) {
      console.error('Eroare la procesarea imaginilor:', error);
      alert('A apărut o eroare la încărcarea imaginilor.');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Aplicăm debounce la handleImageUpload
  const handleImageUpload = debounce((e) => {
    processImages(e.target.files);
  }, 300);

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = [...formData.imagini];
    updatedImages.splice(indexToRemove, 1);
    
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(indexToRemove, 1);
    
    setFormData(prev => ({ ...prev, imagini: updatedImages }));
    setPreviewImages(updatedPreviews);
    
    // Ajustăm indexul selectat dacă e necesar
    if (selectedImageIndex >= updatedPreviews.length) {
      setSelectedImageIndex(Math.max(0, updatedPreviews.length - 1));
    } else if (selectedImageIndex === indexToRemove && updatedPreviews.length > 0) {
      setSelectedImageIndex(Math.min(selectedImageIndex, updatedPreviews.length - 1));
    }
    
    // Ajustăm indexul de start pentru miniaturi dacă e necesar
    if (startThumbnailIndex > 0 && startThumbnailIndex >= updatedPreviews.length - maxVisibleThumbnails) {
      setStartThumbnailIndex(Math.max(0, updatedPreviews.length - maxVisibleThumbnails));
    }
  };

  const handleAddProduct = () => {
    // Nu mai revocăm URL-uri, deoarece folosim base64
    
    if (isClient) {
      sessionStorage.removeItem('productFormData');
      sessionStorage.removeItem('productImageUrls');
    }
    
    console.log('Produs adăugat!', formData);
    router.push('../home/produs-adaugat-succes');
  };

  const goToPreviousImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
      
      if (selectedImageIndex - 1 < startThumbnailIndex) {
        setStartThumbnailIndex(selectedImageIndex - 1);
      }
    }
  };

  const goToNextImage = () => {
    if (selectedImageIndex < previewImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
      
      if (selectedImageIndex + 1 >= startThumbnailIndex + maxVisibleThumbnails) {
        setStartThumbnailIndex(selectedImageIndex + 1 - maxVisibleThumbnails + 1);
      }
    }
  };
  
  const goToPreviousThumbnails = () => {
    if (startThumbnailIndex > 0) {
      setStartThumbnailIndex(Math.max(0, startThumbnailIndex - maxVisibleThumbnails));
    }
  };
  
  const goToNextThumbnails = () => {
    if (startThumbnailIndex + maxVisibleThumbnails < previewImages.length) {
      setStartThumbnailIndex(Math.min(
        previewImages.length - maxVisibleThumbnails,
        startThumbnailIndex + maxVisibleThumbnails
      ));
    }
  };

  const shouldShowThumbnailNavigation = previewImages.length > maxVisibleThumbnails;
  
  const visibleThumbnails = previewImages.slice(
    startThumbnailIndex,
    startThumbnailIndex + maxVisibleThumbnails
  );
  
  return (
    <div className={styles.container}>
      <div className={styles.backButtonWrapper}>
        <BackArrow />
      </div>
      
      <div className={styles.contentBox}>
        <h1 className={styles.mainTitle}>Adăugare produs nou</h1>
        
        <div className={styles.productForm}>
          {/* Input pentru numele produsului */}
          <div className={styles.formField}>
            <input
              type="text"
              name="numeProdus"
              value={formData.numeProdus}
              onChange={handleChange}
              className={styles.textInput}
              placeholder="Nume produs"
              required
            />
          </div>
          
          {/* Secțiunea pentru încărcarea imaginilor */}
          <div className={styles.imageUploadSection}>
            <label className={styles.imageUploadLabel}>
              <div className={styles.uploadButtonWrapper}>
                <span>Adaugă imagini produs</span>
                <input 
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                />
              </div>
            </label>
            
            {/* Previzualizare imagini - doar pe client */}
            {isClient && previewImages.length > 0 && (
              <div className={styles.imageGallery}>
                <div className={styles.mainImage}>
                  <div className={styles.imagePlaceholder}>
                    <Image 
                      src={previewImages[selectedImageIndex]}
                      alt={`Imagine produs ${selectedImageIndex + 1}`}
                      width={400}
                      height={300}
                      className={styles.productImage}
                      unoptimized={previewImages[selectedImageIndex].startsWith('data:')}
                    />
                    
                    {/* Butoane pentru navigarea prin imagini */}
                    {previewImages.length > 1 && (
                      <>
                        <button 
                          className={`${styles.imageNavButton} ${styles.prevButton}`}
                          onClick={goToPreviousImage}
                          disabled={selectedImageIndex === 0}
                          type="button"
                        >
                          &#10094;
                        </button>
                        
                        <button 
                          className={`${styles.imageNavButton} ${styles.nextButton}`}
                          onClick={goToNextImage}
                          disabled={selectedImageIndex === previewImages.length - 1}
                          type="button"
                        >
                          &#10095;
                        </button>
                      </>
                    )}
                    
                    {/* Buton X pentru ștergerea imaginii */}
                    <button 
                      className={styles.removeImageButton}
                      onClick={() => handleRemoveImage(selectedImageIndex)}
                      type="button"
                      aria-label="Șterge imaginea"
                    >
                      &#10005;
                    </button>
                  </div>
                </div>
                
                {/* Contador imagini */}
                <div className={styles.imageCounter}>
                  Imagine {selectedImageIndex + 1} din {previewImages.length} ({3 - previewImages.length} rămase)
                </div>
                
                {/* Miniaturi cu navigare */}
                {previewImages.length > 1 && (
                  <div className={styles.thumbnailsContainer}>
                    {shouldShowThumbnailNavigation && (
                      <button 
                        className={`${styles.thumbnailNavButton} ${styles.thumbnailPrevButton}`}
                        onClick={goToPreviousThumbnails}
                        disabled={startThumbnailIndex === 0}
                        type="button"
                      >
                        &#10094;
                      </button>
                    )}
                    
                    <div className={styles.thumbnails}>
                      {visibleThumbnails.map((img, localIndex) => {
                        const actualIndex = startThumbnailIndex + localIndex;
                        return (
                          <div 
                            key={actualIndex} 
                            className={`${styles.thumbnail} ${actualIndex === selectedImageIndex ? styles.activeThumbnail : ''}`}
                            onClick={() => setSelectedImageIndex(actualIndex)}
                          >
                            <div className={styles.thumbnailPlaceholder}>
                              <Image 
                                src={img}
                                alt={`Miniatură ${actualIndex + 1}`}
                                width={60}
                                height={60}
                                className={styles.thumbnailImage}
                                unoptimized={img.startsWith('data:')}
                              />
                              <span className={styles.thumbnailNumber}>{actualIndex + 1}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {shouldShowThumbnailNavigation && (
                      <button 
                        className={`${styles.thumbnailNavButton} ${styles.thumbnailNextButton}`}
                        onClick={goToNextThumbnails}
                        disabled={startThumbnailIndex + maxVisibleThumbnails >= previewImages.length}
                        type="button"
                      >
                        &#10095;
                      </button>
                    )}
                  </div>
                )}
                
                {/* Afișează numărul total de imagini */}
                <div className={styles.imageLimit}>
                  {previewImages.length}/3 imagini adăugate
                </div>
              </div>
            )}
          </div>
          
          {/* Câmpuri pentru detalii produs */}
          <div className={styles.formField}>
            <textarea
              name="descriere"
              value={formData.descriere}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Descriere produs"
              required
              rows={4}
            />
          </div>
          
          <div className={styles.formField}>
            <textarea
              name="modUtilizare"
              value={formData.modUtilizare}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Mod de utilizare"
              required
              rows={4}
            />
          </div>
          
          <div className={styles.formField}>
            <textarea
              name="materialSiIntretinere"
              value={formData.materialSiIntretinere}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Material și întreținere"
              required
              rows={4}
            />
          </div>
          
          {/* Buton de adăugare produs */}
          <button 
            className={`${styles.addProductButton} ${allFieldsFilled ? styles.gradientButton : ''}`} 
            onClick={handleAddProduct}
            disabled={!allFieldsFilled}
          >
            Adaugă produs
          </button>
        </div>
      </div>
    </div>
  );
}