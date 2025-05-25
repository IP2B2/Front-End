import PropTypes from 'prop-types';
import styles from './ProdusListing.module.css';
import { Montserrat500, Montserrat600 } from '@/lib/fonts/Montserrat';

export default function ProdusListing({ imageSrc, denumire, locatie, data, onRowClick, onIconClick, showHeader}) {
    return (
        <>
            {showHeader && (
                <div className={`${styles.row} ${styles.header} ${Montserrat600.className}`}>
                    <div className={styles.imageWrapper}></div>
                    <div className={styles.cell}>Denumire</div>
                    <div className={styles.cell}>Locație</div>
                    <div className={styles.cell}>Ultima actualizare</div>
                    <div className={styles.icon}></div>
                </div>
            )}

            <div
                className={`${styles.row} ${Montserrat500.className}`}
                onClick={onRowClick}
            >
                <div className={styles.imageWrapper}>
                    {imageSrc ? (
                        <img src={imageSrc} alt="Produs" className={styles.image} />
                    ) : (
                        <div className={styles.placeholder}>Imagine</div>
                    )}
                </div>

                <div className={styles.cell}>{denumire}</div>
                <div className={styles.cell}>{locatie}</div>
                <div className={styles.cell}>{data}</div>

                <div
                    className={styles.icon}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onIconClick) onIconClick();
                    }}
                >
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

ProdusListing.propTypes = {
    imageSrc: PropTypes.string,
    denumire: PropTypes.string.isRequired,
    locatie: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    onRowClick: PropTypes.func,
    onIconClick: PropTypes.func,
    showHeader: PropTypes.bool
};
