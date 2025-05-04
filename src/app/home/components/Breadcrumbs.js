import styles from './Breadcrumbs.module.css'
import Image from 'next/image'

import UserBox from './UserBox'

export default function Breadcrumbs({ page }) {
  return (
    <div className={styles.breadcrumbsContainer}>
      <div>
        <div className={styles.breadcrumbs}>
          <span className={styles.label}>Pagini</span>
          <Image
            src="/icons/slash-icon.svg"
            alt="/"
            width={16}
            height={16}
            className={styles.separator}
          />
          <span className={styles.current}>{page}</span>
        </div>
        <div className={styles.pageTitle}>Acasa</div>
      </div>
      <UserBox />
    </div>
  )
}