'use client'

import CerereListingLaborant from '@/lib/components/home/echipamente/CerereListingLaborant';
import ListareProdus from '@/lib/components/home/echipamente/ProdusListing';
import ListareUser from './ListareUser';
import CerereListingStudent from '@/lib/components/home/echipamente/CerereListingStudent'
import CerereListingAdmin from '@/lib/components/home/echipamente/CerereListingAdmin';

// Adaugă importul pentru componenta din același folder
import CerereListing from './CerereListing';

export default function Page() {
  return (
    <div className="content-wrapper">
      
      {/* Adaugă testarea componentei CerereListing */}
      <p>Testare CerereListing local:</p>
      
      <CerereListing
        title="Test Echipament 1"
        label="Valabil"
        onClick={() => console.log("Clicked - Test Valabil")}
      />
      
      <CerereListing
        title="Test Echipament 2" 
        label="Mentenanță"
        onClick={() => console.log("Clicked - Test Mentenanță")}
      />

      {/* Restul componentelor tale existente */}
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
  
      <p>Cereri listing laborant:</p>

      <CerereListingLaborant
        title="Prelungitor 1"
        location="Facultatea de Informatica Iasi"
        user="Prodan Beatrice"
        label="Pending"
        onClick={() => console.log("clicked - test 1")}
      />

      <CerereListingLaborant
        title="Prelungitor 2"
        location="Facultatea de Informatica Iasi"
        user="Prodan Beatrice"
        label="Accepted"
        onClick={() => console.log("clicked - test 2")}
      />

      <CerereListingLaborant
        title="Prelungitor 3"
        location="Facultatea de Informatica Iasi"
        user="Prodan Beatrice"
        label="Rejected"
        onClick={() => console.log("clicked - test 3")}
      />
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
      <p>Listare users: </p>
      <ListareUser numeUser="Prodan Beatrice"  label="Approved"onClick={()=> console.log("clicked - just testing again")}/>
      <ListareUser numeUser="Prodan Beatrice"  label="Rejected"onClick={()=> console.log("clicked - just testing again")}/>
      <ListareUser numeUser="Prodan Beatrice"  label="FII"onClick={()=> console.log("clicked - just testing again")}/>
      <ListareUser numeUser="Prodan Beatrice"  label="Pending"onClick={()=> console.log("clicked - just testing again")}/>

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
