'use client'

import { useState, useEffect } from 'react';
import styles from './administrareUseri.module.css';
import { useRouter } from 'next/navigation';
import SearchAndFilter from '@/lib/components/home/echipamente/SearchAndFilter';

const usersData = [
  { id: 1, nume: 'Popescu', prenume: 'Ion', facultate: 'FII', subfacultate: 'Informatica', name: 'Popescu Ion' },
  { id: 2, nume: 'Ionescu', prenume: 'Maria', facultate: 'FEEA', subfacultate: 'Management', name: 'Ionescu Maria' },
  { id: 3, nume: 'Georgescu', prenume: 'Ana', facultate: 'FEEA', subfacultate: 'Economie', name: 'Georgescu Ana' },
  { id: 4, nume: 'Marinescu', prenume: 'Andrei', facultate: 'FII', subfacultate: 'Calculatoare', name: 'Marinescu Andrei' },
  { id: 5, nume: 'Dumitrescu', prenume: 'Elena', facultate: 'Litere', subfacultate: 'Romana', name: 'Dumitrescu Elena' },
  { id: 6, nume: 'Vasilescu', prenume: 'Mihai', facultate: 'Litere', subfacultate: 'Engleza', name: 'Vasilescu Mihai' },
];

const usersCollection = {
  filterBy: {
    facultate: "Facultate",
    subfacultate: "Profil/Specializare"
  },
  items: usersData
};

const UserItem = (props) => {
  const { nume, prenume, facultate } = props;
  
  return (
    <div className={styles.userListingContainer}>
      <div className={styles.userName}>
        {nume} {prenume}
      </div>
      <div className={styles.userLabel}>
        {facultate}
      </div>
    </div>
  );
};

export default function AdministrareUseriPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.pageTitle}>Administrare Utilizatori</h1>
        </div>
      </div>
      
      <div className={styles.searchAndFilterContainer}>
        <SearchAndFilter 
          title=""
          ItemComponent={UserItem} 
          collectionObject={usersCollection}
        />
      </div>
    </div>
  );
}