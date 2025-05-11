
import Link from 'next/link'
import Image from 'next/image'

import styles from './UserBox.module.css'

const UserBox = () => {
    return (
        <div className={styles.buttonWrapper}>
        <Link href="/auth/login" className={styles.logoutButton}>
          <Image 
            src="/icons/buton-logout.svg" 
            alt="Logout"
            width={40}
            height={40}
          />
        </Link>
  
        <Link href="/home" target="_blank" className={styles.infoButton}>
          <Image
            src="/icons/buton-info.svg"
            alt="Information"
            width={40}
            height={40}
          />
        </Link>
  
        <Link href="/home" target="_blank" className={styles.userButton}>
          <Image
            src="/icons/buton-user-name.svg"
            alt="User-name"
            width={40}
            height={40}
          />
        </Link>
      </div>
    )
}
export default UserBox;