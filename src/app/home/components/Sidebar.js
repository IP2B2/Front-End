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
          <h1 className={`${styles.title} ${Inter700.className}`}>ISMA</h1>
          <hr className={styles.separator} />
          <nav className={`${styles.nav} ${Inter400.className}`}>
            <Link
              href="/"
              className={`${styles.navItem} ${pathname === '/' || pathname === '/home' ? styles.active : ''}`}
            >
              <span className={styles.icon}>
                <Image
                  src="/icons/home-icon.png"
                  alt="Home"
                  width={16}
                  height={16}
                />
              </span>
              <span>Acasa</span>
            </Link>

            <Link
              href="/alta-pagina"
              className={`${styles.navItem} ${pathname === '/alta-pagina' ? styles.active : styles.inactive}`}
            >
              <span className={styles.icon}>👤</span>
              <span>Alta pagina</span>
            </Link>
          </nav>
        </div>

        <div className={`${styles.userBox} ${Inter500.className}`}>
          <div className={styles.avatar}>AS</div>
          <span>Alex Serban</span>
          <Link href="https://www.google.com" className={styles.logoutButton}>
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