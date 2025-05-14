'use client'
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getEquipmentList } from '@/lib/logic/ApiCalls/EquipCalls';

import SearchAndFilter from '@/lib/components/home/echipamente/SearchAndFilter';
import ProductCard from '@/lib/components/home/echipamente/ProductCard';

import styles from './EchipamentePage.module.css';


const collectionObject = {
    filterBy: {
        location: "Locatie",
        availableTomorrow: "Disponibil maine",
        type: "Tip Obiect",
    },
    items: [
        {
            name: "prelungitor 20M cu maner",
            location: "FEEA - Facultate 2",
            availableTomorrow: "Da",
            faculty: "FEAA",
            image: "/icons/prelungitor.jpg",
            type: "Simplu",
        },
        {
            name: "prelungitor rosu",
            location: "FEEA - Informatica",
            availableTomorrow: "Da",
            faculty: "FEAA",
            image: "/icons/prelungitor.jpg",
            type: "Complex",
        },
        {
            name: "prelungitor galben 3m",
            location: "FEEA - Matematica-Informatică",
            availableTomorrow: "Da",
            faculty: "FEAA",
            image: "/icons/prelungitor.jpg",
            type: "Complex",
        },
        {
            name: "prelungitor 20M cu maner",
            location: "FEEA - Info economica",
            faculty: "FEAA",
            availableTomorrow: "Nu",
            image: "/icons/prelungitor.jpg",
            type: "Simplu",
        },
    ],
};

export default function EchipamentePage() {

    const [data, setData] = useState([]);
    const router = useRouter();

    const cb = useCallback(() => {
        async function getData() {
            const dataRes = await getEquipmentList();
            if(dataRes?.expiredToken || dataRes?.error) {
                console.log("Token expired");
                //router.push('/auth/login');
                return;
            }
            console.log("Data fetched: ", dataRes);
            setData(dataRes?.payload);
        }
        getData();
    }, [setData, router]);

    //useEffect(cb, []);

    return (
        <div className={styles.echipamentePageContainer}>
            {/* <GridTable headerArray={['Denumire', 'Numar Inventar', 'Data Achizitie', 'Cerinte de acces']}>
                {
                    data?.map((equipData) => [
                        equipData.name,
                        equipData.inventoryNumber,
                        equipData.acquisitionDate,
                        equipData.accessRequirements
                    ]).flat().map((divData, index) => <div key={index}>{divData}</div>)
                }
            </GridTable> */}
            <SearchAndFilter title="Echipamente" ItemComponent={ProductCard} collectionObject={collectionObject}/>
            {/* <ProductSearchAndFilter /> */}
        </div>
    )
}

