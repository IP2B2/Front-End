'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './formAdaugareProdus.module.css';
import { BackArrow } from '@/lib/components/globals/NavArrows';
import { useRouter } from 'next/navigation';

import stylesNew from './adaugareEchipament.module.css';
import { DefaultFormLayout, FormContainer, FormField, FormButton, FormImageUploadMultiple } from '@/lib/components/form/Form';
import { emptyInvalidator } from '@/lib/logic/AuthValidators';
import ProductAddedSucc from '@/lib/components/popups/ProductAddedSucc';

import { createEquipment } from '@/lib/service/EquipmentService';
import { getAuthToken } from '@/lib/getAuthToken';
import { acquisitionDateValidator } from '@/lib/validators/acquisitionDateValidator';

export default function AdminAdaugareEchipament() {

  const router = useRouter();

  const [imageLinks, setImageLinks] = useState([]);

  const [name, setName] = useState('');
  const [inventoryNumber, setInventoryNumber] = useState('TST999'); 
  
  const [description, setDescription] = useState('');
  const [usage, setUsage] = useState('');
  const [material, setMaterial] = useState('');

  const [acquisitionDate, setAcquisitionDate] = useState(new Date());

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [formSuccess, setFormSuccess] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

// Înlocuiește useEffect-ul existent cu acesta:

// Înlocuiește useEffect-ul existent cu acesta:

useEffect(() => {
  // Verifică doar câmpurile text, ignoră validitatea imaginilor
  const isValid = 
    name.trim() !== "" && 
    inventoryNumber.trim() !== "" && 
    description.trim() !== "" && 
    usage.trim() !== "" && 
    material.trim() !== "";
  
  // Nu mai verificăm acquisitionDate instanceof Date pentru a evita erori
  // Trebuie doar să existe o valoare
  const hasDate = acquisitionDate != null;
  
  setIsFormValid(isValid && hasDate);
}, [name, inventoryNumber, description, usage, material, acquisitionDate]);

  useEffect(() => {
    console.log('imaegeLinks', imageLinks);
  }, [imageLinks]);

  const handleSubmit = async () => {
    setHasSubmitted(true);
    try {
      await createEquipment(getAuthToken(), {
        name: name.trim(),
        inventoryNumber: inventoryNumber.trim(),
        availabilityStatus: 'AVAILABLE',
        laboratoryId: 1, 
        description: description.trim(),
        usage: usage.trim(),
        material: material.trim(),
        photo: imageLinks.length > 0 ? imageLinks : [],
        acquisitionDate: acquisitionDate
      });
      setFormSuccess(true);
    } catch (error) {
      console.error(error);
      // FIXME add unathorized handling
    }
  };

  return (
    <div className={stylesNew.container}>
      <ProductAddedSucc open={formSuccess} onClose={() => {
        setFormSuccess(false);
      }} />
      <div className={styles.backButtonWrapper}>
        <BackArrow />
      </div>
      <div className={stylesNew.formCard}>
        <DefaultFormLayout
          title={"Adaugare Echipament"}
          subtitle={"Completeaza detaliile echipamentului"}
          >
          <FormContainer>
            <FormField 
              type={"text"}
              label={"Nume"}
              setState={setName}
              formInputId={"name"}
              placeholder={"Prelungitor fara maner"}
              validator={emptyInvalidator}
              validate={hasSubmitted}
            />
            <FormField 
              type={"text"}
              label={"Numar de Inventar"}
              setState={setInventoryNumber}
              formInputId={"inventoryNumber"}
              placeholder={"TST999"}
              validator={emptyInvalidator}
              validate={hasSubmitted}
            />
            <FormField 
              type={"textarea"}
              label={"Descriere"}
              setState={setDescription}
              formInputId={"description"}
              placeholder={"Un prelungitor de calitate superioara, cu 5 prize si protectie la suprasarcina."}
              validator={emptyInvalidator}
              validate={hasSubmitted}
            />
            <FormField
                type={"date"}
                label={"Data achizitiei"}
                value={acquisitionDate}
                setState={setAcquisitionDate}
                validator={acquisitionDateValidator}
                validate={hasSubmitted}
            />
            <FormField 
              type={"textarea"}
              label={"Mod de Utilizare"}
              setState={setUsage}
              formInputId={"usage"}
              placeholder={"Pentru uz casnic si profesional."}
              validator={emptyInvalidator}
              validate={hasSubmitted}
            />
            <FormField
              type={"textarea"}
              label={"Material si Intretinere"}
              setState={setMaterial}
              formInputId={"material"}
              placeholder={"Plastic, curatare usoara."}
              validator={emptyInvalidator}
              validate={hasSubmitted}
            />
            <FormImageUploadMultiple
              setState={setImageLinks}
              label={"Imagini"}
              validate={true}
            />
            <FormButton
              onClick={handleSubmit}
              isValid={isFormValid}
            >Adauga Echipament</FormButton>
          </FormContainer>
        </DefaultFormLayout>
      </div>
    </div>
  )
}


export function PageOld() {
  const router = useRouter();
  
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
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
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
  
useEffect(() => {
  if (!isClient) return;
  
  sessionStorage.setItem('FormData', JSON.stringify(formData));
  
  if (previewImages.length > 0) {
    try {
      sessionStorage.setItem('ImageUrls', JSON.stringify(previewImages));
    } catch (error) {
      console.error('Eroare la salvarea imaginilor:', error);
    }
  }
}, [isClient, formData, previewImages]); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  const isValidImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
  };

  const processImages = async (files) => {
    if (isUploading) return; 
    
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
    
    if (selectedImageIndex >= updatedPreviews.length) {
      setSelectedImageIndex(Math.max(0, updatedPreviews.length - 1));
    } else if (selectedImageIndex === indexToRemove && updatedPreviews.length > 0) {
      setSelectedImageIndex(Math.min(selectedImageIndex, updatedPreviews.length - 1));
    }
    
    if (startThumbnailIndex > 0 && startThumbnailIndex >= updatedPreviews.length - maxVisibleThumbnails) {
      setStartThumbnailIndex(Math.max(0, updatedPreviews.length - maxVisibleThumbnails));
    }
  };

  const handleAddProduct = () => {
    
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
          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Nume produs</label>
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
          
          <div className={styles.imageUploadSection}>
            <label className={styles.fieldLabel}>Adăugare imagini</label>
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
                
                <div className={styles.imageCounter}>
                  Imagine {selectedImageIndex + 1} din {previewImages.length} ({3 - previewImages.length} rămase)
                </div>
                
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
                
                <div className={styles.imageLimit}>
                  {previewImages.length}/3 imagini adăugate
                </div>
              </div>
            )}
          </div>
          
          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Descriere produs</label>
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
            <label className={styles.fieldLabel}>Mod de utilizare</label>
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
            <label className={styles.fieldLabel}>Material și întreținere</label>
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