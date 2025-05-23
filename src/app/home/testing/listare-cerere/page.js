'use client'

import CerereListing from '@/lib/components/home/CerereListing';
import CerereListingLaborant from '@/lib/components/home/echipamente/CerereListingLaborant';
import ListareUser from '@/lib/components/home/echipamente/ListareUser';

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
    </div>
    
  );
}
