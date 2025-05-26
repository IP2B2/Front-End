'use client';
import { useState } from 'react';
import ProductRequestPopup from '@/lib/components/home/ProductRequestPopup';
import ListareUser from '@/lib/components/home/echipamente/ListareUser';

export default function AdminProductRequestsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const productRequests = [
    {
      id: '1379',
      fullName: 'Popescu Alexandru',
      isComplex: true,
      pdfUrl: '/path/to/your/sample.pdf'
    },
  ];
  
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };
  
  const handleApprove = (userId) => {
    console.log(`Approved user ${userId}`);
    setShowPopup(false);
  };
  
  const handleReject = (userId) => {
    console.log(`Rejected user ${userId}`);
    setShowPopup(false);
  };
  
  return (
    <div>
      <h1>Cereri rol utilizatori</h1>
      <div>
        {productRequests.map(user => (
          <ListareUser 
            key={user.id}
            numeUser={user.fullName} 
            label="Pending"
            onClick={() => handleUserClick(user)}
          />
          
        ))}
      </div>
      
      {showPopup && selectedUser && (
        <ProductRequestPopup
          userData={selectedUser}
          onClose={() => setShowPopup(false)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}