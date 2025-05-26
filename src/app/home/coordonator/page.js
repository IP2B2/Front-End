'use client'

import { useState, useEffect } from 'react';
import SearchAndFilter from '@/lib/components/home/echipamente/SearchAndFilter';
import CerereListingLaborant from '@/lib/components/home/echipamente/CerereListingLaborant';
import styles from './adminCereriLaborant.module.css';
import { approveAccessRequest, getAllAccessRequests, rejectAccessRequest } from '@/lib/service/AccessRequestService';
import { getAuthToken } from '@/lib/getAuthToken';
import { getAllUsers } from '@/lib/service/UserService';
import { getAllEquipment } from '@/lib/service/EquipmentService';
import { useRouter } from 'next/navigation';
import {FormButton} from '@/lib/components/form/Form';

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

// const CerereItem = (props) => {
//   const { name, studentName, status } = props;
  
//   const handleClick = () => {
    
//   };
  
  
//   const [showPopup, setShowPopup] = useState(false);

//   const handleClick = () => {
//     setShowPopup(true);
//   };

//   const handleConfirm = () => {
//     setShowPopup(false);
//     // Add confirm logic here
//   };

//   const handleDeny = () => {
//     setShowPopup(false);
//     // Add deny logic here
//   };
//   return (
//     <CerereListingLaborant
//       title={name}
//       studentName={studentName}
//       label={status}
//       onClick={handleClick}
//     />
//   );
// };

export default function CereriLaborantPage() {
  const [mounted, setMounted] = useState(false);

  const [accCollection, setAccCollection] = useState(cereriData);
  useEffect(() => {
    // Simulate fetching access requests
    const fetchAccessRequests = async () => {
      let reqList = await getAllAccessRequests(getAuthToken());
      let users = await getAllUsers(getAuthToken());
      let eqList = await getAllEquipment(getAuthToken());
      console.log("Fetched Access Requests:", reqList);
      console.log("Fetched Users:", users);
      console.log("Fetched Equipment:", eqList);
      reqList = reqList.map(req => {
        const user = users.find(user => user.id === req.userId);
        const equipment = eqList.find(eq => eq.id === req.equipmentId);
        return {
          ...req,
          studentName: user ? user.email : 'Unknown',
          facultate: 'test',
          subfacultate: 'subtest',
          name: equipment ? equipment.name : 'Unknown Equipment',
          imageSrc: equipment && equipment.photo?.length > 0 ? equipment.photo[0] : '',
          tipProdus: 'Basic',
          equipmentId: req.equipmentId,
          status: req.status,
          requestDate: req.requestDate ? new Date(req.requestDate).toLocaleDateString() : 'Unknown Date',
          expectedReturnDate: req.expectedReturnDate ? new Date(req.expectedReturnDate).toLocaleDateString() : 'Unknown Date'
        };
      });

      console.log("Fetched Access Requests:", reqList);
      setAccCollection({
        filterBy: {
          tipProdus: "Tip Produs",
          facultate: "Facultate",
          status: "Status"
        },
        items: reqList
      });
    };
    
    fetchAccessRequests();
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <div className={styles.pageContainer}>
      <SearchAndFilter 
        title="Cereri"
        ItemComponent={ItemComponent}
        collectionObject={accCollection}
      />

    </div>
  );
}

const ItemComponent = ({ studentName, status, id, equipmentId, requestDate, expectedReturnDate }) => {
  const router = useRouter();
  const handleReject = async () => {
    await rejectAccessRequest(getAuthToken(), id);
    router.refresh();

  };

  const handleAccept = async () => {

    await approveAccessRequest(getAuthToken(), id);
    router.refresh();}

  return (
    <div className={styles.itemContainer}>
      <div>
        <div>Id: {id}</div>
        <div>Echipament: {equipmentId}</div>
        <div>Utilizator: {studentName}</div>
        <div>Status: {status}</div>
        <div>Data: {requestDate}</div>
        <div>Data Returnare: {expectedReturnDate}</div>
      </div>
      <div>
        <FormButton onClick={handleAccept} className={styles.acceptButton}>Acceptă</FormButton>
        <FormButton onClick={handleReject} className={styles.rejectButton}>Respinge</FormButton>
      </div>
    </div>
  )

}