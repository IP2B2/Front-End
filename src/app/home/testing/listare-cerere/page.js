'use client'

import CerereListing from '@/lib/components/home/CerereListing';
import CerereListingLaborant from '@/lib/components/home/echipamente/CerereListingLaborant';
import ListareUser from '@/lib/components/home/echipamente/ListareUser';
import ListareProdus from '@/lib/components/home/echipamente/ProdusListing';

export default function Page() {
  return (
    <div className="content-wrapper">
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
