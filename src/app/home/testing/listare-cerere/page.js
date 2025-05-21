'use client'

import CerereListing from '@/lib/components/home/CerereListing';
import CerereListingLaborant from '@/lib/components/home/echipamente/CerereListingLaborant';
import ListareUser from '@/lib/components/home/echipamente/ListareUser';

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
        showHeader={false}
      />



    </div>
    
  );
}
