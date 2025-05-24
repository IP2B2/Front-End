'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './AdaugareProdusPopup.module.css';
import { BackArrow } from '@/lib/components/globals/NavArrows';
import { useRouter } from 'next/navigation';

export default function AdaugareProdusPopup({ onClose }) {
  const router = useRouter();
  
  const [isClient, setIsClient] = useState(false);
  const allFieldsFilled = true;
  
  const productData = {
    numeProdus: 'Prelungitor 20M cu mâner',
    descriere: 'Prelungitor Cube, roz, 2 prize Schuko, cablu flexibil, design modern și compact, perfect pentru birou sau living. Soluție elegantă pentru conectarea dispozitivelor dumneavoastră, combinând funcționalitatea cu estetica contemporană.',
    modUtilizare: 'Conectați ștecherul prelungitorului Cube la priza de perete, apoi folosiți cele două prize Schuko pentru alimentarea dispozitivelor electrice. Datorită designului compact, poate fi așezat pe birou sau podea, iar cablul lung asigură flexibilitate în poziționare.',
    materialSiIntretinere: 'Fabricat din plastic ABS de înaltă calitate, rezistent la uzură și temperaturi ridicate. Carcasa cu finisaj mat împiedică acumularea amprentelor. Pentru întreținere, deconectați de la sursa de curent și ștergeți cu o cârpă uscată. Nu folosiți agenți de curățare lichizi sau abrazivi.',
    imagini: ['/icons/Frame 1000005448.svg']
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddProduct = () => {
    // No action needed in read-only view
  };

  const handleClosePopup = () => {
    if (typeof onClose === 'function') {
      onClose(); // Call the onClose function passed from parent
    } else {
      router.back(); // Fallback to router.back() if no onClose provided
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButtonWrapper}>
        <BackArrow arrowSize={20} onClick={handleClosePopup}/>
      </div>
      
      <div className={styles.contentBox}>
        <div className={styles.contentBoxScroll}>
          <h1 className={styles.mainTitle}>Detalii produs</h1>
          
          <div className={styles.productForm}>
            {/* Product Name - Read Only */}
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Nume produs</label>
              <div className={styles.readOnlyField}>{productData.numeProdus}</div>
            </div>
            
            {/* Product Image - Display Only */}
            <div className={styles.imageGallery}>
              <div className={styles.mainImage}>
                <div className={styles.imagePlaceholder}>
                  <Image 
                    src={productData.imagini[0]}
                    alt={productData.numeProdus}
                    className={styles.productImage}
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </div>
            
            {/* Description - Read Only */}
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Descriere produs</label>
              <div className={styles.readOnlyTextarea}>{productData.descriere}</div>
            </div>
            
            {/* Usage Instructions - Read Only */}
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Mod de utilizare</label>
              <div className={styles.readOnlyTextarea}>{productData.modUtilizare}</div>
            </div>
            
            {/* Maintenance Info - Read Only */}
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Material și întreținere</label>
              <div className={styles.readOnlyTextarea}>{productData.materialSiIntretinere}</div>
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
    </div>
  );
}