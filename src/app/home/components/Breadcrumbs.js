import styles from './Breadcrumbs.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Montserrat400 } from '@/lib/fonts/Montserrat';
import { InterHeading } from '@/lib/fonts/Inter';

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
        { }
        <div className={styles.pinkBarContainer}>
          <div className={styles.pinkBar}>
            <span className={styles.pinkBarText}>
              Verificarea contului dumneavoastră este în curs. Vă mulțumim pentru înțelegere și răbdare!
            </span>
          </div>
        </div>
        
        { }
        <div className={styles.blackContainer}>
          <div className={styles.welcomeContent}>
            <h1 className={styles.welcomeHeading}>Welcome to <Image src="/ISMA.svg" alt="ISMA Logo" width={238} height={70} /></h1>
             <p className={styles.welcomeText}>
              <span className={styles.ismaHighlight}>ISMA</span>
              <span className={`${styles.italicText} ${Montserrat400.className}`}> centralizează procesele administrative legate de utilizarea 
              echipamentelor științifice și tehnice. Principalul obiectiv este 
              optimizarea accesului la echipamente și urmărirea trasabilității 
              acestora printr-un sistem digital, intuitiv și structurat.</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Link href="/auth/login" className={styles.logoutButton}>
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