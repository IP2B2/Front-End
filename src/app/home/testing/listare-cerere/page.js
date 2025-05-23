'use client'

import ListareProdus from '@/lib/components/home/echipamente/ProdusListing';
import CerereListingStudent from '@/lib/components/home/echipamente/CerereListingStudent';
import CerereListingAdmin from '@/lib/components/home/echipamente/CerereListingAdmin';

export default function Page() {
  return (
    <div className="content-wrapper">

      <p>Cereri studenti</p>
      <CerereListingStudent
        title="Laptop Dell XPS 15" 
        label="Pending" 
        location = "Facultatea de Informatica FII"
        onClick={()=> console.log("clicked - just checking if it works")} />

      <CerereListingStudent
        title="Laptop Dell XPS 15" 
        label="Accepted" 
        location = "Facultatea de Informatica FII"
        onClick={()=> console.log("clicked - just checking if it works")} />

      <CerereListingStudent
        title="Laptop Dell XPS 15" 
        label="Rejected" 
        location = "Facultatea de Informatica FII"
        onClick={()=> console.log("clicked - just checking if it works")} />
      
      <p>Cereri admin</p>
      <CerereListingAdmin
        title="Laptop Dell XPS 15"  
        location = "Facultatea de Informatica FII"
        user="Prodan Beatrice"
        label="Pending"
        onClick={()=> console.log("clicked - just checking if it works")} />

      <CerereListingAdmin
        title="Laptop Dell XPS 15"  
        location = "Facultatea de Informatica FII"
        user="Prodan Beatrice"
        label="Accepted"
        onClick={()=> console.log("clicked - just checking if it works")} />

      <CerereListingAdmin
        title="Laptop Dell XPS 15"  
        location = "Facultatea de Informatica FII"
        user="Prodan Beatrice"
        label="Rejected"
        onClick={()=> console.log("clicked - just checking if it works")} />


      <p>Listare produs: </p>
      <ListareProdus
        denumire="Prelungitor gri"
        locatie="FII"
        data="20 Apr. 2025"
        onClick={() => alert('Editează produsul')}
        showHeader={true}
      />
      <ListareProdus
        denumire="Prelungitor gri"
        locatie="FII"
        data="20 Apr. 2025"
        onClick={() => alert('Editează produsul')}
        showHeader={false}
      />
    </div>
    
  );
}
