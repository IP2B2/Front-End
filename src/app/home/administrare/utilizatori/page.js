'use client';


import SearchAndFilter from '@/lib/components/home/echipamente/SearchAndFilter';

import styles from './adminUserPage.module.css'
import aulStyles from './AdminUserListing.module.css';

import ListareUser from '../../testing/componenta-cerere/ListareUser';

const collectionObject ={
    filterBy: {
        active: "Cont activ",
    },
    items: [
        {
            name: "Ion Popescu",
            firstName: "Ion",
            lastName: "Popescu",
            active: true
        },
        { 
            name: "Maria Ionescu",
            firstName: "Maria",
            lastName: "Ionescu",
            active: false
        },
        { 
            name: "Andrei Vasilescu",
            firstName: "Andrei",
            lastName: "Vasilescu",
            active: true
        },
        { 
            name: "Elena Georgescu",
            firstName: "Elena",
            lastName: "Georgescu",
            active: true
        },
        { 
            name: "Ana Marinescu",
            firstName: "Ana",
            lastName: "Marinescu",
            active: true
        }
    ]
}

export default function AdministrareUtilizatoriPage() {
  return (
    <div className={styles.container}>
      <SearchAndFilter 
        title="Administrare Utilizatori"
        ItemComponent={ListareUser}
        HeaderComponent={AdminUserListingHeader}
        collectionObject={collectionObject}
      />
    </div>
  );
}

const AdminUserListingHeader = () => {
  return (
    <div className={aulStyles.container}>
        <div className={aulStyles.firstName}>Prenume</div>
        <div className={aulStyles.lastName}>Nume</div>
        <div className={aulStyles.icon}></div>
    </div>
  );
}

const AdminUserListing = ({
    firstName, 
    lastName
}) => {
  return (
    <div className={aulStyles.container}>
        <div>{firstName}</div>
        <div>{lastName}</div>
        <div className={aulStyles.icon} onClick={() => alert("Edit user")}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
        </div>
    </div>
  );
}

