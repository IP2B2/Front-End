'use client'

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SearchAndFilterAndButton from '@/lib/components/home/echipamente/SearchAndFilterAndButton';
import ProdusListing, {ProdusListingHeader} from '@/lib/components/home/echipamente/ProdusListing';
import styles from './listareProduseAdmin.module.css';
import { getAllEquipments } from './getAllEquipments';
import ProductEditPopup from '@/lib/components/popups/ProductEditPopup';
import { getAllEquipment } from '@/lib/service/EquipmentService';

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
  const [data, setData] = useState(produseData);
  
  const [editEquipmentId, setEditEquipmentId] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleEditProduct = useCallback((id) => {
    // router.push(`/home/administrare/echipamente/editare/${id}`);
    setEditEquipmentId(id);
  }, [router]);

  useEffect(() => {
    if (editEquipmentId) {
      setShowEditPopup(true);
    }
  }, [editEquipmentId]);

  useEffect(() => {
    setMounted(true);

    async function fetchData() {
      let eq = await getAllEquipment(localStorage.getItem('authToken'));
      let newCollectionObject = {
        filterBy: {
          locatie: "Locație",
          status: "Status",
          categorie: "Categorie"
        },
        items: eq.map(item => ({
          id: item.id,
          name: item.name,
          denumire: item.name,
          locatie: item.labName, // Assuming labId is the location
          data: item.acquisitionDate, // Placeholder for date
          status: item.availabilityStatus, // Assuming availabilityStatus is the status
          categorie: "Echipament", // Placeholder for category
          imageSrc: item.photo ? item.photo[0] : null, // Assuming photo is an array and we take the first image
          onClick: () => handleEditProduct(item.id)
        }))
      }
      setData(newCollectionObject);
    }
  setShowEditPopup(false);  
    fetchData();
  }, []);
  
  const handleAddProduct = () => {
    router.push('/home/administrare/echipamente/adaugare-nou');
  };

  const handleRefresh = () => {
    setTimeout(() => {
      location.reload();
    }, 300);
  }

  return (
    <div className={styles.pageContainer}>
      {showEditPopup && (
        <ProductEditPopup
          equipmentId={editEquipmentId}
          onClose={() => {
            handleRefresh();
            setShowEditPopup(false);
          }}
          onDelete={() => {
            handleRefresh();
            setShowEditPopup(false);
          }}
        />
      )}
      <SearchAndFilterAndButton
        title="Produse"
        ItemComponent={EchipamentListing}
        collectionObject={data}
        buttonText="Adăugare produs"
        onButtonClick={handleAddProduct}
        HeaderComponent={ProdusListingHeader}
      />
    </div>
  );
}

const EchipamentListing = ({ denumire, locatie, data, id, imageSrc, onClick }) => (
  <ProdusListing 
    denumire={denumire}
    locatie={locatie}
    data={data}
    imageSrc={imageSrc}
    onClick={onClick}
  />
);