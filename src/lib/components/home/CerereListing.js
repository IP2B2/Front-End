import PropTypes from 'prop-types';
import styles from './CerereListing.module.css';

export default function CerereListing({ title, label }) {

  const isValabil = label === 'Valabil';
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={isValabil ? styles.greenLabel : styles.redLabel} >{label}</div>
    </div>
  );
}


CerereListing.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.oneOf(['Valabil', 'Mentenanță']).isRequired,
};
