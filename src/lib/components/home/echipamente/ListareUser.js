import PropTypes from 'prop-types';
import styles from './ListareUser.module.css';

export default function ListareUser({ numeUser, label, onClick }) {
  const isRejected = label === 'Rejected';
  const isApproved = label === 'Approved';
  const isPending = label === 'Pending';

  const getStatusClass = () => {
    if (isApproved) return styles.greenLabel;
    if (isRejected) return styles.redLabel;
    if (isPending) return styles.yellowLabel;
    return styles.label;
  };

  return (
    <div className={styles.container} onClick={onClick ?? undefined}>
      <div className={styles.numeUser}>{numeUser}</div>
      <div className={`${styles.label} ${getStatusClass()}`}>{label}</div>
    </div>
  );
}

ListareUser.propTypes = {
  numeUser: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
