import styles from './Breadcrumbs.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Breadcrumb({ page }) {
  return (
    <div className={styles.breadcrumbsContainer}>
      <div>
        <div className={styles.breadcrumbs}>
          <span className={styles.label}>Pagini</span>
          <Image
            src="/icons/slash-icon.png"
            alt="/"
            width={16}
            height={16}
            className={styles.separator}
          />
          <span className={styles.current}>{page}</span>
        </div>
        <div className={styles.pageTitle}>Acasa</div>
      </div>
      <div className={styles.buttonWrapper}>
          <Link href="https://www.google.com/" className={styles.logoutButton}>
            <Image 
              src="/icons/buton-logout.png" 
              alt="Logout"
              width={40}
              height={40}
            />
          </Link>

          <Link href="https://www.google.com/" target="_blank" className={styles.infoButton}>
            <Image
              src="/icons/buton-info.png"
              alt="Information"
              width={40}
              height={40}
            />
          </Link>

          <Link href="https://www.google.com/" target="_blank" className={styles.userButton}>
            <Image
              src="/icons/buton-user-name.png"
              alt="User-name"
              width={40}
              height={40}
            />
          </Link>
        </div>
    </div>
  )
}