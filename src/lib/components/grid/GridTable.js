
import gtStyles from './GridTable.module.css'

export const GridTable = ({ dataArray, cols, children, headerArray }) => {

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