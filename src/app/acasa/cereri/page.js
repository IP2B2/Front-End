"use client";


import { useEffect, useState } from "react";

import { getEnrichedMyAccessRequests } from "@/lib/actions/accessRequestsActions";

import CerereListingStudent from "@/lib/components/home/echipamente/CerereListingStudent";
import SearchAndFilter from "@/lib/components/home/echipamente/SearchAndFilter";

const initialCollectionObject = {
  filterBy: {
    status: "Status",
  },
  items: []
}

export default function CereriPage() {

  const [isMounting, setIsMounting] = useState(true);

  const [cereri, setCereri] = useState(initialCollectionObject);

  useEffect(() => {
    async function fetchCereri() {
      const fetchedCereri = await getEnrichedMyAccessRequests();
      if (!fetchedCereri.success) {
        console.error("Failed to fetch requests:", fetchedCereri);
        return;
      }
      console.log("Fetched requests:", fetchedCereri.payload);
      setCereri({
        filterBy: {
          status: "Status",
        },
        items: fetchedCereri.payload.map((cerere) => ({
          id: cerere.id,
          name: cerere.equipment.name,
          title: cerere.equipment.name,
          location: "N/A",
          label: cerere.status === "PENDING" ? "Pending" : (cerere.status === "ACCEPTED" ? "Accepted" : "Rejected"),
          imageSrc: JSON.parse(cerere.equipment.photo)[0] || null,
          dateStart: new Date(cerere.requestDate).toLocaleDateString("ro-RO"),
          dateEnd: new Date(cerere.expectedReturnDate).toLocaleDateString("ro-RO"),
        }))
      });
      setIsMounting(false);
    }

    fetchCereri();
  }, []);


  return (
    <div>
      <SearchAndFilter
        collectionObject={cereri}
        ItemComponent={CerereListingStudent}
        title="Cererile mele"
      />
    </div>
  );
}