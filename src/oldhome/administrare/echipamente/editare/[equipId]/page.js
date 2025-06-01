'use client';

import { useParams } from 'next/navigation';

import { getEquipmentById } from '../../getEquipmentById';
import { useEffect, useState } from 'react';

export default function AdminEquipmentEditPage() {

  const params = useParams();
  const equipId = params.equipId;

  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    async function fetchEquipment() {
      try {
        const data = await getEquipmentById({ id: equipId, token: localStorage.getItem('authToken') });
        setEquipment(data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    }

    fetchEquipment();
  }, [equipId]);

  return (
    <div>
      <h1>Editare Echipament</h1>
      <p>Aici puteți edita detaliile echipamentului selectat.</p>
      {/* Form for editing equipment details will go here */}
    </div>
  );
}