import PropTypes from 'prop-types';
import styles from './CerereListing.module.css';

export default function CerereListing({ title, label, onClick }) {

  const isValabil = label === 'Valabil';

  return (
    <div className={styles.container}
    onClick={onClick ? onClick : () =>{}}>

      <div className={styles.title}>{title}</div>
      <div className={isValabil ? styles.greenLabel : styles.redLabel} >{label}</div>

    </div>
  );
}

CerereListing.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.oneOf(['Valabil', 'Mentenanță']).isRequired,
  onClick: PropTypes.func,
};