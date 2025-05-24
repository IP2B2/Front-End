'use client'

import CerereListingLaborant from '@/lib/components/home/echipamente/CerereListingLaborant';
import ListareUser from '@/lib/components/home/echipamente/ListareUser';
import ListareProdus from '@/lib/components/home/echipamente/ProdusListing';
import CerereListingStudent from '@/lib/components/home/echipamente/CerereListingStudent';

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
      
      <p>Listare users: </p>
      <ListareUser
        nume="Popescu"
        prenume="Ion"
        facultate="Facultatea de Informatică Iași"
        rol="Student"
        onClick={() => alert('Edit')}
        showHeader={true}
      />

      <ListareUser
        nume="Ionescu"
        prenume="Maria"
        facultate="Facultatea de Informatică Iași"
        rol="Student"
        onClick={() => alert('Edit')}
      />



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
