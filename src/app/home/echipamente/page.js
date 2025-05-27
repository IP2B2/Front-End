'use client'
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getEquipmentList } from '@/lib/logic/ApiCalls/EquipCalls';

import SearchAndFilter from '@/lib/components/home/echipamente/SearchAndFilter';
import ProductCard from '@/lib/components/home/echipamente/ProductCard';

import styles from './EchipamentePage.module.css';
import { getAllEquipment } from '@/lib/service/EquipmentService';

export default function EchipamentePage() {

    const [data, setData] = useState({
        filterBy: {
            location: "Facultate",
            availableTomorrow: "Disponibil maine",
        },
        items: [],
    });
    const router = useRouter();

    const cb = useCallback(() => {
        async function getData() {
            const dataRes = await getEquipmentList();
            if(dataRes?.expiredToken || dataRes?.error) {
                console.log("Token expired");
                router.push('/auth/login');
                return;
            }
            var data = [];
            let eq = await getAllEquipment(localStorage.getItem('authToken'));

            data = eq.map(item => ({
                id: item.id,
                name: item.name,
                availableTomorrow: item.availableTomorrow === 'AVAILABLE',
                labId: item.laboratoryId,
                image: item.photo[0] || '/icons/prelungitor.jpg',
                faculty: null
            }));

            let collectionObject = {
                filterBy: {
                    faculty: "Facultate",
                    availableTomorrow: "Disponibil maine",
                },
                items: data,
            };
            setData(collectionObject);
        }
        getData();
    }, [setData, router]);

    useEffect(cb, []);



    return (
        <div className={styles.echipamentePageContainer}>
            <SearchAndFilter title="Echipamente" ItemComponent={ProductCard} collectionObject={data}/>
        </div>
    )
}

