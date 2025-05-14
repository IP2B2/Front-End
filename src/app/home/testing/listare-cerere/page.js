'use client'

import CerereListing from '@/lib/components/home/CerereListing';

export default function Page() {
  return (
    <div className="content-wrapper">
      <CerereListing title="Laptop Dell XPS 15" label="Mentenanță" onClick={()=> console.log("clicked - just checking if it works")} />
      <CerereListing title="Prelungitor cu mâner" label="Valabil"onClick={()=> console.log("clicked - just testing again")}/>
    </div>
    
  );
}
