import styles from './profilPage.module.css';
import { Montserrat800 } from '@/lib/fonts/Montserrat';

export default function Profil() {
  return (
    <div className={styles.profilBg + ' ' + Montserrat800.className}>
      <div className={styles.profilCard}>
        <div className={styles.header}>
          <div className={styles.avatar}></div>
          <div className={styles.headerText}>
            <div className={styles.surname}>BALTAG</div>
            <div className={styles.name}>Bianca-Teodora</div>
          </div>
        </div>
        <div className={styles.detailsSection}>
          <div className={styles.detailsBox}>
            <div className={styles.detailsName}>Baltag Bianca-Teodora</div>
            <div className={styles.detailsId}>RSL0016281141</div>
            <div className={styles.detailsSex}>SEX: FEMININ</div>
          </div>
          <div className={styles.detailsRight}>
            <div className={styles.detailRow}>
              <div className={styles.detailSquare}></div>
              <div className={styles.detailLines}>
                <div className={styles.detailLine + ' ' + styles.detailLineShort}></div>
                <div className={styles.detailLine}></div>
              </div>
            </div>
            <div className={styles.detailRow}>
              <div className={styles.detailSquare}></div>
              <div className={styles.detailLines}>
                <div className={styles.detailLine + ' ' + styles.detailLineShort}></div>
                <div className={styles.detailLine}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rolesRow}>
          <div className={styles.roleStudent}>STUDENT</div>
          <div className={styles.roleInfo}>INFORMATICA</div>
          <div className={styles.roleFii}>FII</div>
        </div>
        <div className={styles.actionsRow}>
          <button className={styles.actionProfile}>Administrare Profil</button>
          <button className={styles.actionSecurity}>Securitate</button>
        </div>
      </div>
    </div>
  );
}