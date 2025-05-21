'use client'

import CerereListing from '@/lib/components/home/CerereListing';
import CerereListingLaborant from '@/lib/components/home/echipamente/CerereListingLaborant';
import ListareUser from '@/lib/components/home/echipamente/ListareUser';
import ListareProdus from '@/lib/components/home/echipamente/ProdusListing';

export default function Page() {
  return (
    <div className="content-wrapper">
      <p>Cereri listing studenti</p>
      <CerereListing title="Laptop Dell XPS 15" label="Mentenanță" onClick={()=> console.log("clicked - just checking if it works")} />
      <CerereListing title="Prelungitor cu mâner" label="Valabil"onClick={()=> console.log("clicked - just testing again")}/>

      <p>Cereri listing laborant: </p>
      <CerereListingLaborant title="Prelungitor 1" studentName="Prodan Beatrice" label="Pending"onClick={()=> console.log("clicked - just testing again")}/>
      <CerereListingLaborant title="Prelungitor 2" studentName="Prodan Beatrice" label="Accepted"onClick={()=> console.log("clicked - just testing again")}/>
      <CerereListingLaborant title="Prelungitor 3" studentName="Prodan Beatrice" label="Rejected"onClick={()=> console.log("clicked - just testing again")}/>

      <p>Listare users: </p>
      <ListareUser numeUser="Prodan Beatrice"  label="Approved"onClick={()=> console.log("clicked - just testing again")}/>
      <ListareUser numeUser="Prodan Beatrice"  label="Rejected"onClick={()=> console.log("clicked - just testing again")}/>
      <ListareUser numeUser="Prodan Beatrice"  label="FII"onClick={()=> console.log("clicked - just testing again")}/>
      <ListareUser numeUser="Prodan Beatrice"  label="Pending"onClick={()=> console.log("clicked - just testing again")}/>

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
        onEdit={() => alert('Editează produsul')}
        showHeader={true}
      />
      <ListareProdus
        denumire="Prelungitor gri"
        locatie="FII"
        data="20 Apr. 2025"
        onEdit={() => alert('Editează produsul')}
        showHeader={false}
      />
    </div>
    
  );
}
