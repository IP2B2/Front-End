'use client'

import { useState, useEffect } from 'react';
import styles from './administrareUseri.module.css';
import { useRouter } from 'next/navigation';
import SearchAndFilter from '@/lib/components/home/echipamente/SearchAndFilter';
import ListareUser from '@/lib/components/home/echipamente/ListareUser';

const usersData = [
  { id: 1, nume: 'Popescu', prenume: 'Ion', facultate: 'FII', subfacultate: 'Informatica', rol: 'Student', name: 'Popescu Ion' },
  { id: 2, nume: 'Ionescu', prenume: 'Maria', facultate: 'FEEA', subfacultate: 'Management', rol: 'Student', name: 'Ionescu Maria' },
  { id: 3, nume: 'Georgescu', prenume: 'Ana', facultate: 'FEEA', subfacultate: 'Economie', rol: 'Profesor', name: 'Georgescu Ana' },
  { id: 4, nume: 'Marinescu', prenume: 'Andrei', facultate: 'FII', subfacultate: 'Calculatoare', rol: 'Student', name: 'Marinescu Andrei' },
  { id: 5, nume: 'Dumitrescu', prenume: 'Elena', facultate: 'Litere', subfacultate: 'Romana', rol: 'Profesor', name: 'Dumitrescu Elena' },
  { id: 6, nume: 'Vasilescu', prenume: 'Mihai', facultate: 'Litere', subfacultate: 'Engleza', rol: 'Administrator', name: 'Vasilescu Mihai' },
];

const usersCollection = {
  filterBy: {
    facultate: "Facultate",
    subfacultate: "Profil/Specializare",
    rol: "Rol"
  },
  items: usersData
};

const UserListingWrapper = ({ index, ...props }) => {
  return (
    <ListareUser 
      {...props} 
      showHeader={index === 0}
      onClick={() => handleUserEdit(props.id)}
    />
  );
};

export default function AdministrareUseriPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUserEdit = (userId) => {
    console.log(`Editare utilizator cu ID: ${userId}`);

  };

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
          title="Utilizatori"
          ItemComponent={(props) => {
            const { index, ...userProps } = props;
            return (
              <ListareUser 
                {...userProps}
                showHeader={index === 0} 
                onClick={() => handleUserEdit(userProps.id)}
              />
            );
          }}
          collectionObject={usersCollection}
        />
      </div>
    </div>
  );
}