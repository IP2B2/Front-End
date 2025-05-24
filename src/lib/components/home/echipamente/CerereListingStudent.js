import PropTypes from 'prop-types';
import styles from './CerereListingStudent.module.css';
import { Montserrat500 } from '@/lib/fonts/Montserrat';

export default function CerereListingStudent ({ imageSrc, title, location, label, onClick }) {
  const isAccepted = label === 'Accepted';
  const isRejected = label === 'Rejected';

  return (
    <div className={`${styles.container} ${Montserrat500}`} onClick={onClick ?? (() => {})}>
      <div className={styles.imageWrapper}>
        {imageSrc ? (
          <img src={imageSrc} alt="Produs" className={styles.image} />
          ) : (
            <div className={styles.placeholder}>Imagine</div>
          )}
      </div>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.location}>Locatie: {location}</div>
        <div className={styles.statusContainer}>
          Status: <span className={`${styles.label} ${isAccepted ? styles.greenLabel : (isRejected ? styles.redLabel : styles.label)}`}>{label === 'Pending' ? 'În așteptare' : label}</span>
        </div>
      </div>
    </div>
  );
}

CerereListingStudent.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  label: PropTypes.oneOf(['Accepted', 'Rejected', 'Pending']).isRequired,
  onClick: PropTypes.func,
};