'use client'

import CerereListing from '@/lib/components/home/CerereListing';

export default function Page() {
  return (
    <div className="content-wrapper">
      <CerereListing title="Laptop Dell XPS 15" label="Mentenanță" />
      <CerereListing title="Prelungitor cu mâner" label="Valabil"/>
    </div>
    
  );
}
