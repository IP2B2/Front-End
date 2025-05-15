'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './formAdaugareProdus.module.css';
import { BackArrow } from '@/lib/components/globals/NavArrows';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  // Stare pentru formularul de adăugare produs
  const [formData, setFormData] = useState({
    numeProdus: '',
    descriere: '',
    modUtilizare: '',
    materialSiIntretinere: '',
    imagini: []
  });

  // Verificăm dacă toate câmpurile sunt completate
  const allFieldsFilled = 
    formData.numeProdus.trim() !== '' && 
    formData.descriere.trim() !== '' && 
    formData.modUtilizare.trim() !== '' && 
    formData.materialSiIntretinere.trim() !== '' &&
    formData.imagini.length > 0;

  // Stare pentru previzualizarea imaginilor
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Pentru afișarea unui număr limitat de miniaturi
  const [startThumbnailIndex, setStartThumbnailIndex] = useState(0);
  const maxVisibleThumbnails = 5;
  
  // Încărcăm datele salvate din sessionStorage la montarea componentei
  useEffect(() => {
    // Încărcăm datele formularului
    const savedFormData = sessionStorage.getItem('productFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(prev => ({
          ...prev,
          numeProdus: parsedData.numeProdus || '',
          descriere: parsedData.descriere || '',
          modUtilizare: parsedData.modUtilizare || '',
          materialSiIntretinere: parsedData.materialSiIntretinere || '',
          // Imaginile se vor încărca separat
          imagini: [] 
        }));
      } catch (error) {
        console.error('Eroare la încărcarea datelor formularului:', error);
      }
    }
    
    // Încărcăm URL-urile imaginilor
    const savedImageUrls = sessionStorage.getItem('productImageUrls');
if (savedImageUrls) {
  try {
    const parsedUrls = JSON.parse(savedImageUrls);
    setPreviewImages(parsedUrls);
    setFormData(prev => ({
      ...prev,
      imagini: Array(parsedUrls.length).fill('placeholder-image')
    }));
  } catch (error) {
    console.error('Eroare la încărcarea URL-urilor imaginilor:', error);
  }
}

  }, []);
  
  // Salvăm datele în sessionStorage când se modifică
  useEffect(() => {
    // Salvăm datele de text ale formularului
    const formDataToSave = {
      numeProdus: formData.numeProdus,
      descriere: formData.descriere,
      modUtilizare: formData.modUtilizare,
      materialSiIntretinere: formData.materialSiIntretinere,
      // Nu includem imaginile aici
    };
    
    sessionStorage.setItem('productFormData', JSON.stringify(formDataToSave));
    
    // Salvăm URL-urile imaginilor separat
    if (previewImages.length > 0) {
      sessionStorage.setItem('productImageUrls', JSON.stringify(previewImages));
    } else {
      sessionStorage.removeItem('productImageUrls');
    }
  }, [formData.numeProdus, formData.descriere, formData.modUtilizare, formData.materialSiIntretinere, previewImages]);
  
  // Actualizarea datelor formularului
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
  const files = Array.from(e.target.files);

  if (files.length > 0) {
    const totalImageCount = formData.imagini.length + files.length;

    if (totalImageCount > 10) {
      alert('Puteți adăuga maximum 10 imagini.');
      return;
    }

    // Convertim fiecare imagine în base64
    const readFileAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file); // asta generează un string base64
      });
    };

    const newBase64Images = await Promise.all(files.map(readFileAsBase64));
    const updatedPreviews = [...previewImages, ...newBase64Images];

    setPreviewImages(updatedPreviews);
    setFormData(prev => ({
      ...prev,
      imagini: [...prev.imagini, ...files]
    }));

    setSelectedImageIndex(previewImages.length);
    sessionStorage.setItem('productImageUrls', JSON.stringify(updatedPreviews));
  }
};

  // Eliminarea unei imagini
  const handleRemoveImage = (indexToRemove) => {
    // Eliminăm imaginea din formData
    const updatedImages = [...formData.imagini];
    updatedImages.splice(indexToRemove, 1);
    
    // Eliminăm URL-ul de previzualizare
    const updatedPreviews = [...previewImages];
    const urlToRevoke = updatedPreviews[indexToRemove];
    
    // Doar revocăm URL-ul dacă pare a fi un blob URL (pentru URL-uri create local)
    if (urlToRevoke && urlToRevoke.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRevoke);
    }
    
    updatedPreviews.splice(indexToRemove, 1);
    
    // Actualizăm state-ul
    setFormData(prev => ({
      ...prev,
      imagini: updatedImages
    }));
    setPreviewImages(updatedPreviews);
    
    // Actualizăm sessionStorage
    if (updatedPreviews.length > 0) {
      sessionStorage.setItem('productImageUrls', JSON.stringify(updatedPreviews));
    } else {
      sessionStorage.removeItem('productImageUrls');
    }
    
    // Ajustăm indexul selectat dacă e necesar
    if (selectedImageIndex >= updatedPreviews.length) {
      setSelectedImageIndex(Math.max(0, updatedPreviews.length - 1));
    } else if (selectedImageIndex === indexToRemove && updatedPreviews.length > 0) {
      // Menținem același index dacă este posibil
      setSelectedImageIndex(Math.min(selectedImageIndex, updatedPreviews.length - 1));
    }
    
    // Ajustăm indexul de start pentru miniaturi dacă e necesar
    if (startThumbnailIndex > 0 && startThumbnailIndex >= updatedPreviews.length - maxVisibleThumbnails) {
      setStartThumbnailIndex(Math.max(0, updatedPreviews.length - maxVisibleThumbnails));
    }
  };

  // Curățăm URL-urile de previzualizare și datele temporare la trimiterea formularului
  const handleAddProduct = () => {
    // Curățăm toate URL-urile de blob din memorie
    previewImages.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    
    // Curățăm datele din sessionStorage
    sessionStorage.removeItem('productFormData');
    sessionStorage.removeItem('productImageUrls');
    
    // Aici se va implementa logica pentru adăugarea produsului
    console.log('Produs adăugat!', formData);
    router.push('/home/produs-adaugat-succes');
  };

  // Restul codului rămâne neschimbat...
  const goToPreviousImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
      
      // Actualizăm indexul de start pentru miniaturi dacă e necesar
      if (selectedImageIndex - 1 < startThumbnailIndex) {
        setStartThumbnailIndex(selectedImageIndex - 1);
      }
    }
  };

  const goToNextImage = () => {
    if (selectedImageIndex < previewImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
      
      // Actualizăm indexul de start pentru miniaturi dacă e necesar
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

  // Cleanup la dezmontarea componentei
  useEffect(() => {
    return () => {
      previewImages.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewImages]);

  // Verificăm dacă trebuie să afișăm săgețile pentru miniaturi
  const shouldShowThumbnailNavigation = previewImages.length > maxVisibleThumbnails;
  
  // Obținem miniaturile care trebuie afișate
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
            
            {/* Previzualizare imagini */}
            {previewImages.length > 0 && (
              <div className={styles.imageGallery}>
                <div className={styles.mainImage}>
                  <div className={styles.imagePlaceholder}>
                    <Image 
                      src={previewImages[selectedImageIndex]}
                      alt={`Imagine produs ${selectedImageIndex + 1}`}
                      width={400}
                      height={300}
                      className={styles.productImage}
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
                  Imagine {selectedImageIndex + 1} din {previewImages.length} ({10 - previewImages.length} rămase)
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
                  {previewImages.length}/10 imagini adăugate
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