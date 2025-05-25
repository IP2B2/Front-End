'use client';

import { useState } from 'react';
import styles from './page.module.css';
import EditUserDetailsPopup from '@/lib/components/popups/EditUserDetailsPopup';

export default function EditUserTestPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const sampleUsers = [
    {
      id: 1,
      nume: 'Popescu',
      prenume: 'Ion',
      facultate: 'Facultatea de Informatică Iași',
      profil: 'Informatică',
      an: '3',
      grupa: 'B2',
      nrMatricol: '123456789'
    },
    {
      id: 2,
      nume: 'Ionescu',
      prenume: 'Maria',
      facultate: 'Facultatea de Economie și Administrarea Afacerilor',
      profil: 'Management',
      an: '2',
      grupa: 'A4',
      nrMatricol: '987654321'
    }
  ];
  
  const handleOpenPopup = (user) => {
    setCurrentUser(user);
    setShowPopup(true);
  };
  
  const handleSaveUser = (userData) => {
    console.log('User data saved:', userData);
    alert('Datele utilizatorului au fost salvate!');
    setShowPopup(false);
  };
  
  const handleDeleteUser = (userId) => {
    console.log('Deleted user with ID:', userId);
    alert(`Utilizatorul cu ID ${userId} a fost șters!`);
    setShowPopup(false);
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Test Editare Utilizatori</h1>
      
      <div className={styles.usersGrid}>
        {sampleUsers.map(user => (
          <div key={user.id} className={styles.userCard} onClick={() => handleOpenPopup(user)}>
            <h3>{user.nume} {user.prenume}</h3>
            <p>{user.facultate}</p>
            <p>An: {user.an}, Grupa: {user.grupa}</p>
          </div>
        ))}
      </div>
      
      <EditUserDetailsPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onSave={handleSaveUser}
        onDelete={handleDeleteUser}
        userData={currentUser}
      />
    </div>
  );
}