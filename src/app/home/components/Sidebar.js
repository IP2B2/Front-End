'use client'
import styles from './Sidebar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Inter700, Inter500, Inter400 } from '@/lib/fonts/Inter'

export default function Sidebar() {
  const pathname = usePathname()
  
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.topSection}>
          <div className={styles.title}>
            <Image src="/IsmaBlack.svg" alt="ISMA Logo" width={120} height={40} />
          </div>
          <hr className={styles.separator} />
          <nav className={`${styles.nav} ${Inter400.className}`}>
            <Link
              href="/"
              className={`${styles.navItem} ${pathname === '/' || pathname === '/home' ? styles.active : ''}`}
            >
              <span className={styles.icon}>
                <Image
                  src="/icons/mobilenav1.svg"
                  alt="Home"
                  width={16}
                  height={16}
                />
              </span>
              <span>Acasa</span>
            </Link>
            
            <Link
              href="/echipamente"
              className={`${styles.navItem} ${pathname === '/echipamente' ? styles.active : styles.inactive}`}
            >
              <span className={styles.icon}>
                <Image
                  src="/icons/mobilenav2.svg"
                  alt="Echipamente"
                  width={16}
                  height={16}
                />
              </span>
              <span>Echipamente</span>
            </Link>

            <Link
              href="/cereri"
              className={`${styles.navItem} ${pathname === '/cereri' ? styles.active : styles.inactive}`}
            >
              <span className={styles.icon}>
                <Image
                  src="/icons/mobilenav3.svg"
                  alt="Cereri"
                  width={16}
                  height={16}
                />
              </span>
              <span>Cereri</span>
            </Link>

            <Link
              href="/profil"
              className={`${styles.navItem} ${pathname === '/profil' ? styles.active : styles.inactive}`}
            >
              <span className={styles.icon}>
                <Image
                  src="/icons/mobilenav4.svg"
                  alt="Profil"
                  width={16}
                  height={16}
                />
              </span>
              <span>Profil</span>
            </Link>
          </nav>
        </div>
        
        <div className={`${styles.userBox} ${Inter500.className}`}>
          <div className={styles.avatar}>AS</div>
          <span>Alex Serban</span>
          <Link href="/auth/login" className={styles.logoutButton}>
            <Image
              src="/icons/buton-logout.png"
              alt="Logout"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
    </aside>
  )
}
