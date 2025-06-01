import PropTypes from 'prop-types';
import styles from './ListareUser.module.css';
import { Montserrat500, Montserrat600 } from '@/lib/fonts/Montserrat';

export default function ListareUser({ username, lastName, firstName, facultate, rol, label, onClick, showHeader }) {
  const isRejected = label === 'Rejected';
  const isApproved = label === 'Approved';
  const isPending = label === 'Pending';
  const isFII = label === 'FII'; // Verificare pentru label "FII"
  
  // Adăugat verificare pentru combinația facultate + rol
  const isFacultyStudent = facultate && rol && 
    (facultate.toLowerCase().includes('informatica') || facultate.toLowerCase().includes('informatică')) && 
    rol.toLowerCase() === 'student';

  // Dacă există lastName și firstName separate, le combinăm; altfel folosim username
  const fullName = username || `${lastName || ''} ${firstName || ''}`.trim();
  
  // Dacă avem facultate și rol, le afișăm; altfel doar label-ul
  const displayText = facultate && rol ? `${facultate} - ${rol}` : (label || '');

  const getStatusClass = () => {
    if (isApproved) return styles.greenLabel;
    if (isRejected) return styles.redLabel;
    if (isPending) return styles.yellowLabel;
    if (isFII) return styles.blueGradientLabel; // Pentru label "FII"
    if (isFacultyStudent) return styles.blueGradientLabel; // Pentru "Facultatea de Informatica - Student"
    return styles.label;
  };

  return (
    <div className={styles.container} onClick={onClick ?? undefined}>
      <div className={styles.username}>{fullName}</div>
      <div className={`${styles.label} ${getStatusClass()}`}>
        {displayText}
      </div>
    </div>
  );
}

ListareUser.propTypes = {
  username: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  facultate: PropTypes.string,
  rol: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  showHeader: PropTypes.bool,
};

ListareUser.defaultProps = {
  showHeader: false,
};