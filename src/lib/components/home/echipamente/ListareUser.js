import PropTypes from 'prop-types';
import styles from './ListareUser.module.css';
import { Montserrat500, Montserrat600 } from '@/lib/fonts/Montserrat';

export default function ListareUser({ numeUser, nume, prenume, label, onClick }) {
  const isRejected = label === 'Rejected';
  const isApproved = label === 'Approved';
  const isPending = label === 'Pending';

  const fullName = numeUser || `${nume || ''} ${prenume || ''}`.trim();

  const getStatusClass = () => {
    if (isApproved) return styles.greenLabel;
    if (isRejected) return styles.redLabel;
    if (isPending) return styles.yellowLabel;
    return styles.label;
  };

  return (
    <div className={styles.container} onClick={onClick ?? undefined}>
      <div className={styles.numeUser}>{fullName}</div>
      <div className={`${styles.label} ${getStatusClass()}`}>{label}</div>
    </div>
  );
}

ListareUser.propTypes = {
  numeUser: PropTypes.string,
  nume: PropTypes.string,
  prenume: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  showHeader: PropTypes.bool,
};

ListareUser.defaultProps = {
  showHeader: false,
};

