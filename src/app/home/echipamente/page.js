'use client'
import { useCallback, useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';

import { getEquipmentList } from '@/lib/logic/ApiCalls/EquipCalls';
import { GridTable } from '@/lib/components/grid/GridTable';

export default function EchipamentePage() {

    const [data, setData] = useState([]);
    const router = useRouter();

    const cb = useCallback(() => {
        async function getData() {
            const dataRes = await getEquipmentList();
            if(dataRes?.expiredToken || dataRes?.error) {
                console.log("Token expired");
                router.push('/auth/login');
                return;
            }
            console.log("Data fetched: ", dataRes);
            setData(dataRes?.payload);
        }
        getData();
    }, [setData, router]);

    useEffect(cb, []);

    return (
        <div>
            <GridTable headerArray={['Denumire', 'Numar Inventar', 'Data Achizitie', 'Cerinte de acces']}>
                {
                    data?.map((equipData) => [
                        equipData.name,
                        equipData.inventoryNumber,
                        equipData.acquisitionDate,
                        equipData.accessRequirements
                    ]).flat().map((divData, index) => <div key={index}>{divData}</div>)
                }
            </GridTable>
        </div>
    )
}

