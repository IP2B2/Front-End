'use client'
import { useCallback, useState, useEffect, Fragment } from 'react';
import { getLabs } from './getLabs'

import gtStyles from './GridTable.module.css'

export default function LaboratoriesListPage() {

    const [data, setData] = useState([]);

    const cb = useCallback(() => {
        getLabs().then(data2 => {
            console.log(data2);
            setData(data2);
        });
    }, [setData]);

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

const GridTable = ({ dataArray, cols, children, headerArray }) => {

    if(!cols)
        cols = headerArray ? headerArray?.length : 2;

    return (
        <div className={gtStyles.tableContainer} style={{gridTemplateColumns: `repeat(${(parseInt(cols) != NaN ? cols : 2)}, 1fr)`}}>
            {headerArray.map((header, index) => <div key={index} className={gtStyles.headerCell}>{header}</div>)}
            {children}
        </div>
    )
}

const GridTableContainer = ({ headerArray }) => {
    return (
        <div className={gtStyles.tableContainer}>

        </div>
    )
}