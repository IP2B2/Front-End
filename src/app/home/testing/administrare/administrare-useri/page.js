'use client'

import { useState } from 'react';
import styles from './page.module.css';
import ProductEditPopup from '@/lib/components/popups/ProductEditPopup';

export default function AdminProductTestPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const productData = {
    id: 1,
    numeProdus: 'Prelungitor 20M cu mâner',
    descriere: 'Prelungitor Cube, roz, 2 prize Schuko, cablu flexibil, design modern și compact, perfect pentru birou sau living. Soluție elegantă pentru conectarea dispozitivelor dumneavoastră, combinând funcționalitatea cu estetica contemporană.',
    modUtilizare: 'Conectați ștecherul prelungitorului Cube la priza de perete, apoi folosiți cele două prize Schuko pentru alimentarea dispozitivelor electrice. Datorită designului compact, poate fi așezat pe birou sau podea, iar cablul lung asigură flexibilitate în poziționare.',
    materialSiIntretinere: 'Fabricat din plastic ABS de înaltă calitate, rezistent la uzură și temperaturi ridicate. Carcasa cu finisaj mat împiedică acumularea amprentelor. Pentru întreținere, deconectați de la sursa de curent și ștergeți cu o cârpă uscată. Nu folosiți agenți de curățare lichizi sau abrazivi.',
    status: 'Disponibil',
    imagini: ['/icons/Frame 1000005448.svg', '/icons/Frame 1000005450.svg']
  };

  const handleSave = (formData) => {
    console.log('Produs modificat:', formData);
    setShowPopup(false);
    setSuccessMessage('Produsul a fost modificat cu succes!');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleDelete = (id) => {
    console.log('Produs șters, id:', id);
    setShowPopup(false);
    setSuccessMessage('Produsul a fost șters cu succes!');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Administrare Produse</h1>
      
      <button 
        className={styles.openPopupButton}
        onClick={() => setShowPopup(true)}
      >
        Deschide popup editare produs
      </button>
      
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}
      
      {showPopup && (
        <ProductEditPopup
          productData={productData}
          onClose={() => setShowPopup(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}