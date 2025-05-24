'use client';
import { useState } from 'react';
import RequestDetailsPopup from '@/lib/components/home/echipamente/RequestDetailsPopup';
import ListareUser from '@/lib/components/home/echipamente/ListareUser';

export default function RequestDetailsTestPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  const requests = [
    {
      id: '1379',
      userFullName: 'Popescu Alexandru',
      faculty: 'Facultatea de Informatică',
      yearAndGroup: 'Anul 3, Grupa B2, Semestrul 1',
      cnp: '1234567890123',
      role: 'Student',
      productName: 'Laptop Dell XPS 15',
      productImage: 'https://via.placeholder.com/80',
      productLink: 'https://example.com/produs/1379',
      rentalPeriod: '20.05.2025-27.05.2025',
      rentalReason: 'Proiect de cercetare pentru licență',
      usageInstructions: 'Conectați ștecherul prelungitorului Cube la priza de perete, apoi folosiți cele două prize Schuko pentru alimentarea dispozitivelor electrice. Datorită designului compact, poate fi așezat pe birou sau podea, iar cablul lung asigură flexibilitate în poziționare.',
      maintenanceInfo: 'Fabricat din plastic ABS de înaltă calitate, rezistent la uzură și temperaturi ridicate. Carcasa cu finisaj mat împiedică acumularea amprentelor. Pentru întreținere, deconectați de la sursa de curent și ștergeți cu o cârpă uscată. Nu folosiți agenți de curățare lichizi sau abrazivi.',
      status: 'pending',
      isComplex: true,
      pdfUrl: 'https://example.com/proiect.pdf'
    },
  ];
  
  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setShowPopup(true);
  };
  
  return (
    <div>
      <h1>Cereri echipamente</h1>
      <div>
        {requests.map(request => (
          <ListareUser 
            key={request.id}
            numeUser={request.userFullName} 
            label={request.status === 'accepted' ? 'Admisă' : request.status === 'rejected' ? 'Respinsă' : 'În așteptare'}
            onClick={() => handleRequestClick(request)}
          />
        ))}
      </div>
      
      {showPopup && selectedRequest && (
        <RequestDetailsPopup
          requestData={selectedRequest}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}