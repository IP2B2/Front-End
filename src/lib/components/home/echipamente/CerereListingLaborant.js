import PropTypes from 'prop-types';
import styles from './CerereLIistingLaborant.module.css';

export default function CerereListingLaborant({ title, studentName, label, onClick }) {

  const isAccepted = label === 'Accepted';
  const isRejected = label == 'Rejected';

  return (
    <div className={styles.container}
    onClick={onClick ??(() =>{})}>

    <div className={styles.textContainer}> {/* Adăugat container nou */}
        <div className={styles.title}>{title}</div>
        <div className={styles.stdName}>{studentName}</div>
    </div>
      <div className={`${styles.label} ${isAccepted ? styles.greenLabel : (isRejected ? styles.redLabel : styles.label)}`} >{label}</div>

    </div>
  );
}

CerereListingLaborant.propTypes = {
  title: PropTypes.string.isRequired,
  studentName: PropTypes.string,
  label: PropTypes.oneOf(['Accepted', 'Rejected', 'Pending']).isRequired,
  onClick: PropTypes.func,
};