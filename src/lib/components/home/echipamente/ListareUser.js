import PropTypes from 'prop-types';
import styles from './ListareUser.module.css';

export default function ListareUser({ numeUser, label, onClick }) {

  const isRejected = label === 'Rejected';
  const isApproved = label === 'Approved';
  const isPending = label === 'Pending';

  return (
    <div className={styles.container}
    onClick={onClick ??(() =>{})}>

      <div className={styles.numeUser}>{numeUser}</div>
      <div className={`${styles.label} ${isApproved ? styles.greenLabel : (isRejected ? styles.redLabel : (isPending ? styles.yellowLabel : styles.label))}`} >{label}</div>

    </div>
  );
}

ListareUser.propTypes = {
  numeUser: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};