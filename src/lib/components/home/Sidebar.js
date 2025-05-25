'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Inter500, Inter400 } from '@/lib/fonts/Inter'

import styles from './Sidebar.module.css'

export default function Sidebar() {
  const pathname = usePathname()
  // const isAdminPage = pathname === '/home/administrare'
  
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.topSection}>
          <div className={styles.title}>
            <Image src="/IsmaBlack.svg" alt="ISMA Logo" width={160} height={53} />
          </div>
          <hr className={styles.separator} />
          <nav className={`${styles.nav} ${Inter400.className}`}>
            {/* {isAdminPage && (
              <Link
                href="/home/administrare"
                className={`${styles.navItem} ${styles.adminNavItem} ${pathname === '/home/administrare' ? styles.active : ''}`}
              >
                <span>
                  <Image
                    src="/icons/icon-administrare.svg"
                    alt="Administrare"
                    width={18}
                    height={18}
                  />
                </span>
                <span>Administrare</span>
              </Link>
            )} */}
            <Link
              href="/home"
              className={`${styles.navItem} ${pathname === '/' || pathname === '/home' ? styles.active : ''}`}
            >
              <span>
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
              href="/home/echipamente"
              className={`${styles.navItem} ${pathname === '/home/echipamente' ? styles.active : styles.inactive}`}
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
              href="/home/profil"
              className={`${styles.navItem} ${pathname === '/home/profil' ? styles.active : styles.inactive}`}
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
        </div>
      </div>
    </aside>
  )
}
