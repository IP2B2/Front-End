'use client'
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getLabs } from '@/lib/logic/ApiCalls/LabCalls';
import { GridTable } from '@/lib/components/grid/GridTable';

export default function LaboratoriesListPage() {

    const [data, setData] = useState([]);
    const router = useRouter();

    const cb = useCallback(() => {
        async function getData() {
            const dataRes = await getLabs();
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
            <GridTable headerArray={['Denumire', 'Descriere', 'Locatie', 'Numar echipamente']}>
                {
                    data?.map((labData) => [
                        labData.labName,
                        labData.description,
                        labData.location,
                        labData.equipmentIds?.length
                    ]).flat().map((divData, index) => <div key={index}>{divData}</div>)
                }
            </GridTable>
        </div>
    )
}
