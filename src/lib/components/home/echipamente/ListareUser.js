import PropTypes from 'prop-types';
import styles from './ListareUser.module.css';
import { Montserrat500, Montserrat600 } from '@/lib/fonts/Montserrat';

export default function ListareUser({ nume, prenume, facultate, rol, onClick, showHeader }) {
  return (
    <>
      {showHeader && (
        <div className={`${styles.row} ${styles.header} ${Montserrat600.className}`}>
          <div className={styles.cell}>Nume</div>
          <div className={styles.cell}>Prenume</div>
          <div className={styles.cell}>Facultate / Instituție</div>
          <div className={styles.cell}>Rol</div>
          <div className={styles.icon}></div>
        </div>
      )}
      <div className={`${styles.row} ${Montserrat500.className}`}>
        <div className={styles.cell}>{nume}</div>
        <div className={styles.cell}>{prenume}</div>
        <div className={styles.cell}>{facultate}</div>
        <div className={styles.cell}>{rol}</div>
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

ListareUser.propTypes = {
  nume: PropTypes.string.isRequired,
  prenume: PropTypes.string.isRequired,
  facultate: PropTypes.string.isRequired,
  rol: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  showHeader: PropTypes.bool,
};

ListareUser.defaultProps = {
  showHeader: false,
};

