'use client'

import {useState} from 'react';
import SearchAndFilter from '@/lib/components/home/echipamente/SearchAndFilter';
import CerereListing from '@/lib/components/home/echipamente/CerereListingStudent';
import styles from './cereriUseri.module.css';
import RequestDetailsPopup from '@/lib/components/home/echipamente/RequestDetailsPopup';

const userRequests = {
  filterBy: {
    status: "Status",
    facultate: "Facultate"
  },
  items: [
    { 
      name: "Laptop Dell Inspiron 15",
      status: "Valabil", 
      facultate: "Informatica",
      id: 1
    },
    { 
      name: "Prelungitor 3 prize",
      status: "Mentenanță", 
      facultate: "FEAA",
      id: 2
    },
    { 
      name: "Videoproiector Samsung",
      status: "Valabil", 
      facultate: "Fizică",
      id: 3
    },
    { 
      name: "Monitor LG 27 inch",
      status: "Mentenanță", 
      facultate: "Litere",
      id: 4
    },
    { 
      name: "Tastatură wireless Logitech",
      status: "Valabil", 
      facultate: "Informatica",
      id: 5
    },
    { 
      name: "Mouse Bluetooth Microsoft",
      status: "Valabil", 
      facultate: "Biologie",
      id: 6
    }
  ]
};

export default function CereriUseriPage() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Componenta de item pentru SearchAndFilter
  const RequestItem = ({ name, status }) => {
    const handleClick = () => {
      console.log(`Clicked on item: ${name}`);
      setSelectedRequest({name});
      setShowPopup(true);
    };

    return (
      <CerereListing 
        title={name}
        label={status}
        onClick={handleClick}
      />
    );
  };

  return (
    <div className={styles.pageContainer}>
      <SearchAndFilter 
        title="Cereri" 
        ItemComponent={RequestItem}
        collectionObject={userRequests}
      />

      <RequestDetailsPopup 
        open={showPopup} 
        requestData={selectedRequest}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}