
import Image from 'next/image';

import PropTypes from 'prop-types';
import styles from './ProdusListing.module.css';
import { Montserrat500, Montserrat600 } from '@/lib/fonts/Montserrat';

export default function ProdusListing({ imageSrc, denumire, locatie, data, onClick, admin}) {
    console.log("ProdusListing", { imageSrc, denumire, locatie, data, onClick, admin });
    return (
        <>
        <div className={`${styles.row} ${Montserrat500.className}`}>
            <div className={styles.imageWrapper}>
                {imageSrc && imageSrc.length > 3 ? (
                    <Image
                        src={imageSrc}
                        alt="Echipament"
                        className={styles.image}
                        width={50}
                        height={50} />
                    ) : (
                    <div className={styles.placeholder}>Imagine</div>
                )}
            </div>
            <div className={styles.cell}>{denumire}</div>
            <div className={styles.cell}>{locatie}</div>
            <div className={styles.cell}>{data}</div>
            <div className={styles.icon} onClick={onClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
            </div>
        </div>
        </>
    );
}

export function ProdusListingHeader() {
    return (
            <div className={`${styles.row} ${styles.header} ${Montserrat600.className}`}>
                <div className={styles.imageWrapper}></div>
                <div className={styles.cell}>Denumire</div>
                <div className={styles.cell}>Locație</div>
                <div className={styles.cell}>Ultima actualizare</div>
                <div className={styles.icon}></div>
            </div>
        );
}

ProdusListing.propTypes = {
    denumire: PropTypes.string.isRequired,
    locatie: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    imagineSrc: PropTypes.string,
    onClick: PropTypes.func,
};