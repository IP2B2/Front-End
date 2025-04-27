

import Image from 'next/image';

import styles from './MobileNavbar.module.css';
import '@/app/globals.css';

const MobileNavbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.buttonWrapper}>
                <Image 
                    src="/icons/mobilenav1.svg" 
                    alt="home"
                    fill
                    sizes="(max-width: 680px) 37px, 60px"
                />
            </div>
            <div className={styles.buttonWrapper}>
                <Image 
                    src="/icons/mobilenav2.svg" 
                    alt="list"
                    fill
                    sizes="(max-width: 680px) 37px, 60px"
                />
            </div>
            <div className={styles.buttonWrapper}>
                <Image 
                    src="/icons/mobilenav3.svg" 
                    alt="gpr"
                    fill
                    sizes="(max-width: 680px) 37px, 60px"
                />
            </div>
            <div className={styles.buttonWrapper}>
                <Image 
                    src="/icons/mobilenav4.svg" 
                    alt="user"
                    fill
                    sizes="(max-width: 680px) 37px, 60px"
                />
            </div>
        </div>
    )
}
export default MobileNavbar;