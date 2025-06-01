'use client';

import { useEffect, useState } from 'react';

import styles from './coordonatorPage.module.css'
import { getAccessRequests, getEnrichedAccessRequests } from '@/lib/actions/accessRequestsActions';

import CerereListingLaborant from '@/lib/components/home/echipamente/CerereListingLaborant';
import SearchAndFilter from '@/lib/components/home/echipamente/SearchAndFilter';

import { CererePreviewModal } from '@/lib/components/globals/CererePreviewModal';

const initCollectionObject = {
    filterBy: {
        location: "Locație",
        label: "Status",
        isComplex: "Complexitate",
    },
    items: [],
};



export default function CoordonatorPage() {

    const [accessRequests, setAccessRequests] = useState(initCollectionObject);

    const [currentAccessRequest, setCurrentAccessRequest] = useState(null);
    
    useEffect(() => {
        async function fetchAccessRequests() {
            let accReqsResolution = await getEnrichedAccessRequests();
            console.log("Fetched access requests:", accReqsResolution);
            console.log("Fetched access requests payload:", accReqsResolution.payload);

            let newCollectionObject = {
                filterBy: initCollectionObject.filterBy,
                items: accReqsResolution.payload.map((item) => {
                    let result = {
                        enrichedAccessRequest: item,
                        imageSrc: item.equipment?.photo ? JSON.parse(item.equipment.photo)[0] : null,
                        name: `${item.equipment?.name} ${item.equipment?.inventoryNumber} ${item.user.firstName ? item.user.firstName : ""} ${item.user.lastName ? item.user.lastName : ""} ${item.user.email ? item.user.email : ""} ${item.user.nrMarca ? item.user.nrMarca : ""}`,
                        title: item.equipment?.name || "N/A",
                        location: item.equipment?.laboratory?.labName  + " " + item.equipment?.laboratory?.location || "N/A",
                        user: item.user.email || "N/A",
                        label: item.status === "PENDING" ? "Pending" : item.status === "APPROVED" ? "Accepted" : "Rejected",
                        isComplex: item.equipment?.isComplex ? "Complex" : "Simplu",
                        onClick: () => {
                            setCurrentAccessRequest(item);
                        }
                    }
                    return result;
                })
            };
            setAccessRequests(newCollectionObject); 
        }
        fetchAccessRequests();
    }, []);

    return (
        <div className={styles.coordonatorPage}>
            { currentAccessRequest && (
                <CererePreviewModal
                    enrichedRequestData={currentAccessRequest}
                    onClose={() => setCurrentAccessRequest(null)}
                />
            )}
            <SearchAndFilter
                title={"Cereri de acces"}
                collectionObject={accessRequests}
                ItemComponent={CerereListingLaborant}
                />
        </div>
    );
}