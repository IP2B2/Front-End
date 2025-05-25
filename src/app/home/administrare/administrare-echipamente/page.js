'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchAndFilterAndButton from '@/lib/components/home/echipamente/SearchAndFilterAndButton';
import ProdusListing from '@/lib/components/home/echipamente/ProdusListing';
import styles from './listareProduseAdmin.module.css';
import { BackArrow } from '@/lib/components/globals/NavArrows';
import ProductAddedSucc from '@/lib/components/popups/ProductAddedSucc';

const produseData = {
  filterBy: {
    locatie: "Locație",
    status: "Status",
    categorie: "Categorie"
  },
  items: [
    { 
      id: 1,
      name: "Microscop electronic",
      denumire: "Microscop electronic",
      locatie: "Laborator Fizică", 
      data: "12 Mai 2025",
      status: "Disponibil",
      categorie: "Echipament științific",
      imageSrc: null
    },
    { 
      id: 2,
      name: "Laptop Dell XPS",
      denumire: "Laptop Dell XPS",
      locatie: "Sala 332", 
      data: "10 Mai 2025",
      status: "În folosință",
      categorie: "Computer",
      imageSrc: null
    },
    { 
      id: 3,
      name: "Videoproiector Epson",
      denumire: "Videoproiector Epson",
      locatie: "Sala 210", 
      data: "15 Mai 2025",
      status: "Disponibil",
      categorie: "Echipament multimedia",
      imageSrc: null
    },
    { 
      id: 4,
      name: "Kit Arduino",
      denumire: "Kit Arduino",
      locatie: "Laborator Electronică", 
      data: "8 Mai 2025",
      status: "În mentenanță",
      categorie: "Echipament electronic",
      imageSrc: null
    },
    { 
      id: 5,
      name: "Monitor LG UltraFine",
      denumire: "Monitor LG UltraFine",
      locatie: "Sala 101", 
      data: "5 Mai 2025",
      status: "Disponibil",
      categorie: "Computer",
      imageSrc: null
    }
  ]
};

export default function ListareProduseAdminPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
      const shouldShowPopup = localStorage.getItem('showSuccessPopup');
      if (shouldShowPopup === 'true') {
          setShowPopup(true);
          localStorage.removeItem('showSuccessPopup');
      }
  }, []);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }
  
  const handleAddProduct = () => {
    router.push('/home/form-adaugare-produs');
  };
  
  const handleEditProduct = (id) => {
    console.log('Editare produs cu ID: ${id}');
    alert("Buton edit");
  };

  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.layoutWrapper}>

        <div className={styles.leftColumn}>
          <div className={styles.backButtonWrapper}>
            <BackArrow arrowSize={20} />
          </div>
        </div>
        
        <ProductAddedSucc open={showPopup} onClose={() => setShowPopup(false)} />

        <div className={styles.rightColumn}>
          <SearchAndFilterAndButton 
            title="Produse"
            ItemComponent={({ denumire, locatie, data, id, imageSrc }) => (
              <ProdusListing 
                denumire={denumire}
                locatie={locatie}
                data={data}
                imageSrc={imageSrc}
                showHeader={showHeader && id === 1}
                onRowClick={() => router.push('/home/administarare/administrare-produse')}
                onIconClick={() => handleEditProduct(id)}
              />
            )}
            collectionObject={produseData}
            buttonText="Adăugare produs"
            onButtonClick={handleAddProduct}
          />
        </div>
      </div>
  
    </div>
  );
  
}