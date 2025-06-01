'use client'

import { useState, useEffect } from 'react';
import SearchAndFilter from '@/lib/components/home/echipamente/SearchAndFilter';
import ListareUser from '@/lib/components/home/echipamente/ListareUser';
import styles from './listareCereriAdmin.module.css';

const cereriAdminData = {
  filterBy: {
    tipCerere: "Tip Cerere",
    facultate: "Facultate",
    status: "Status"
  },
  items: [
    { 
      id: 1,
      name: "Alexandru Popescu",
      numeUser: "Alexandru Popescu",
      facultate: "FII", 
      subfacultate: "Informatica", 
      tipCerere: "Echipament Complex",
      status: "Pending"
    },
    { 
      id: 2,
      name: "Maria Ionescu",
      numeUser: "Maria Ionescu",
      facultate: "FEEA", 
      subfacultate: "Contabilitate", 
      tipCerere: "Echipament Basic",
      status: "Approved"
    },
    { 
      id: 3,
      name: "Andrei Vasilescu",
      numeUser: "Andrei Vasilescu",
      facultate: "FII", 
      subfacultate: "Calculatoare", 
      tipCerere: "Echipament Complex",
      status: "Rejected"
    },
    { 
      id: 4,
      name: "Elena Georgescu",
      numeUser: "Elena Georgescu",
      facultate: "FEEA", 
      subfacultate: "Management", 
      tipCerere: "Echipament Basic",
      status: "Pending"
    },
    { 
      id: 5,
      name: "Mihai Dumitrescu",
      numeUser: "Mihai Dumitrescu",
      facultate: "FII", 
      subfacultate: "Informatica", 
      tipCerere: "Echipament Complex",
      status: "Approved"
    },
    { 
      id: 6,
      name: "Ana Marinescu",
      numeUser: "Ana Marinescu",
      facultate: "FEEA", 
      subfacultate: "Economie", 
      tipCerere: "Echipament Basic",
      status: "Rejected"
    }
  ]
};

const UserItem = (props) => {
  const { numeUser, status } = props;
  
  const handleClick = () => {
    console.log(`Clicked on user: ${numeUser} with status: ${status}`);
  };
  
  return (
    <ListareUser
      numeUser={numeUser}
      label={status}
      onClick={handleClick}
    />
  );
};

export default function CereriAdminPage() {
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
        ItemComponent={UserItem}
        collectionObject={cereriAdminData}
      />
    </div>
  );
}