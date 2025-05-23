'use client'

import { useState, useEffect } from 'react';
import SearchAndFilter from '@/lib/components/home/echipamente/SearchAndFilter';
import CerereListingLaborant from '@/lib/components/home/echipamente/CerereListingLaborant';
import styles from './adminCereriLaborant.module.css';

const cereriData = {
  filterBy: {
    tipProdus: "Tip Produs",
    facultate: "Facultate",
    status: "Status"
  },
  items: [
    { 
      id: 1,
      name: "Microscop electronic",
      studentName: "Alexandru Popescu",
      facultate: "FII", 
      subfacultate: "Informatica", 
      tipProdus: "Complex",
      status: "Pending"
    },
    { 
      id: 2,
      name: "Laptop Dell XPS 15",
      studentName: "Maria Ionescu",
      facultate: "FEEA", 
      subfacultate: "Contabilitate", 
      tipProdus: "Basic",
      status: "Accepted"
    },
    { 
      id: 3,
      name: "Videoproiector Epson",
      studentName: "Andrei Vasilescu",
      facultate: "FII", 
      subfacultate: "Informatica", 
      tipProdus: "Basic",
      status: "Rejected"
    },
    { 
      id: 4,
      name: "Kit Arduino avansați",
      studentName: "Elena Georgescu",
      facultate: "FII", 
      subfacultate: "Calculatoare", 
      tipProdus: "Complex",
      status: "Pending"
    },
    { 
      id: 5,
      name: "Monitor LG UltraFine",
      studentName: "Mihai Dumitrescu",
      facultate: "FEEA", 
      subfacultate: "Management", 
      tipProdus: "Basic",
      status: "Accepted"
    }
  ]
};

const CerereItem = (props) => {
  const { name, studentName, status } = props;
  
  const handleClick = () => {
    console.log(`Clicked on request: ${name} by ${studentName}`);
  };
  
  return (
    <CerereListingLaborant
      title={name}
      studentName={studentName}
      label={status}
      onClick={handleClick}
    />
  );
};

export default function CereriLaborantPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <div className={styles.pageContainer}>
      <SearchAndFilter 
        title="Cereri"
        ItemComponent={CerereItem}
        collectionObject={cereriData}
      />
    </div>
  );
}