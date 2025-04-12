'use client'
import styles from './Sidebar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>ISMA</h1>
      <hr className={styles.separator} />
      <nav className={styles.nav}>
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

      <div className={styles.userBox}>
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
    </aside>
  )
}