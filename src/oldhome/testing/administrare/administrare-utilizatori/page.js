'use client';

import { useState } from 'react';
import styles from './administrareUtilizatori.module.css';
import ListareUser from '@/lib/components/home/echipamente/ListareUser';
import UserDetailsPopup from '@/lib/components/popups/UserDetailsPopup';

export default function AdministrareUtilizatoriPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const testUsers = [
    {
      id: 1,
      nume: "Popescu",
      prenume: "Alexandru",
      facultate: "Facultatea de Informatică",
      profil: "Student",
      an: "3",
      grupa: "A3",
      nrMatricol: "12345678"
    },
    {
      id: 2,
      nume: "Ionescu",
      prenume: "Maria",
      facultate: "Facultatea de Economie",
      profil: "Student",
      an: "2",
      grupa: "B4",
      nrMatricol: "23456789"
    },
    {
      id: 3,
      nume: "Dumitrescu",
      prenume: "Ion",
      facultate: "Facultatea de Litere",
      profil: "Profesor",
      an: "-",
      grupa: "-",
      nrMatricol: "34567890"
    }
  ];

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Administrare Utilizatori</h1>
      
      <div className={styles.usersList}>
        {testUsers.map((user, index) => (
          <ListareUser
            key={user.id}
            nume={user.nume}
            prenume={user.prenume}
            facultate={user.facultate}
            rol={user.profil}
            onClick={() => handleUserClick(user)}
            showHeader={index === 0}
          />
        ))}
      </div>
      
      <UserDetailsPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        userData={selectedUser}
      />
    </div>
  );
}