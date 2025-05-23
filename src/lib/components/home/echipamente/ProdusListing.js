import PropTypes from 'prop-types';
import styles from './ProdusListing.module.css';

export default function ProdusListing({ title, label, onClick }) {

    const isValabil = label === 'Valabil';
    const isMentenanta = label === 'Mentenanță';

    const getStatulClass = () => {
        if (isValabil) return styles.greenLabel;
        if (isMentenanta) return styles.redLabel;
        return styles.label;
    };

    return (
        <div className={styles.container}
            onClick={onClick ?? undefined}>

            <div className={styles.title}>{title}</div>
            <div className={`${styles.label} ${getStatulClass()}`} >{label}</div>

        </div>
    );
}

ProdusListing.propTypes = {
    title: PropTypes.string.isRequired,
    label: PropTypes.oneOf(['Valabil', 'Mentenanță']).isRequired,
    onClick: PropTypes.func,
};