'use client';
import { useState } from 'react';
import RoleRequestPopup from '@/lib/components/admin/RoleRequestPopup';
import ListareUser from '@/lib/components/home/echipamente/ListareUser';

export default function AdminRoleRequestsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const roleRequests = [
    {
      id: '1379',
      fullName: 'Popescu Alexandru',
      faculty: 'Facultatea de Informatică',
      yearAndGroup: 'Anul 3, Grupa B2, Semestrul 1',
      cnp: '1234567890123',
      role: 'Student'
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
        {roleRequests.map(user => (
          <ListareUser 
            key={user.id}
            numeUser={user.fullName} 
            label="Pending"
            onClick={() => handleUserClick(user)}
          />
        ))}
      </div>
      
      {showPopup && selectedUser && (
        <RoleRequestPopup
          userData={selectedUser}
          onClose={() => setShowPopup(false)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}