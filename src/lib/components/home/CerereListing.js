import styles from './CerereListing.module.css';

export default function CerereListing({ title, label }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.label} >{label}</div>
    </div>
  );
}
