'use client'

import { useState, useEffect } from 'react';
import styles from './administrareUseri.module.css';
import { useRouter } from 'next/navigation';
import SearchAndFilter from '@/lib/components/home/echipamente/SearchAndFilter';

// Mock data pentru demonstrație
const usersData = [
  { id: 1, nume: 'Popescu', prenume: 'Ion', facultate: 'FII', subfacultate: 'Informatica', nume_complet: 'Popescu Ion' },
  { id: 2, nume: 'Ionescu', prenume: 'Maria', facultate: 'FEEA', subfacultate: 'Management', nume_complet: 'Ionescu Maria' },
  { id: 3, nume: 'Georgescu', prenume: 'Ana', facultate: 'FEEA', subfacultate: 'Economie', nume_complet: 'Georgescu Ana' },
  { id: 4, nume: 'Marinescu', prenume: 'Andrei', facultate: 'FII', subfacultate: 'Calculatoare', nume_complet: 'Marinescu Andrei' },
  { id: 5, nume: 'Dumitrescu', prenume: 'Elena', facultate: 'Litere', subfacultate: 'Romana', nume_complet: 'Dumitrescu Elena' },
  { id: 6, nume: 'Vasilescu', prenume: 'Mihai', facultate: 'Litere', subfacultate: 'Engleza', nume_complet: 'Vasilescu Mihai' },
];

export default function AdministrareUseriPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    facultate: '',
    subfacultate: ''
  });
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCereriClick = () => {
    router.push('/home/cereri-utilizatori');
  };

  // Filtrează utilizatorii în funcție de căutare și filtre
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = !searchQuery || 
      user.nume_complet.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFacultate = !selectedFilters.facultate || 
      user.facultate === selectedFilters.facultate;
    
    const matchesSubfacultate = !selectedFilters.subfacultate || 
      user.subfacultate === selectedFilters.subfacultate;
    
    return matchesSearch && matchesFacultate && matchesSubfacultate;
  });

  // Extrage opțiunile disponibile pentru filtre
  const facultatiOptions = [...new Set(usersData.map(user => user.facultate))];
  const subfacultatiOptions = selectedFilters.facultate ? 
    [...new Set(usersData
      .filter(user => user.facultate === selectedFilters.facultate)
      .map(user => user.subfacultate))] : [];

  if (!isClient) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Administrare Utilizatori</h1>
      </div>
      
      <div className={styles.pageContent}>
        <div className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h2 className={styles.filterTitle}>Filtre</h2>
            
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Facultate</label>
              <select 
                className={styles.filterSelect}
                value={selectedFilters.facultate}
                onChange={(e) => setSelectedFilters({
                  ...selectedFilters, 
                  facultate: e.target.value,
                  subfacultate: '' // Resetăm subfacultatea când se schimbă facultatea
                })}
              >
                <option value="">Toate facultățile</option>
                {facultatiOptions.map(fac => (
                  <option key={fac} value={fac}>{fac}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Profil/Specializare</label>
              <select 
                className={styles.filterSelect}
                value={selectedFilters.subfacultate}
                onChange={(e) => setSelectedFilters({
                  ...selectedFilters, 
                  subfacultate: e.target.value
                })}
                disabled={!selectedFilters.facultate}
              >
                <option value="">Toate profilele</option>
                {subfacultatiOptions.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Caută utilizatori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <button 
              className={styles.cereriButton}
              onClick={handleCereriClick}
            >
              Cereri utilizatori
            </button>
          </div>
          
          <div className={styles.usersListContainer}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div key={user.id} className={styles.userListingContainer}>
                  <div className={styles.userName}>
                    {user.nume} {user.prenume}
                  </div>
                  <div className={styles.userLabel}>
                    {user.facultate}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                Nu s-au găsit utilizatori care să corespundă criteriilor de căutare.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}