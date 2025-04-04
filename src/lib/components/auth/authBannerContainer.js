
import Image from 'next/image';

import { Montserrat400 } from '@/lib/fonts/Montserrat';

import '@/app/globals.css'
import styles from './authBannerContainer.module.css'

const BannerContainer = () => {
    return <div className={styles.bannerContainer}>
        <Image
            src="/ISMA.svg"
            width={400}
            height={152}
            alt="Picture of the author"
        />
            <div className={styles.bannerAppTitle + ' ' + Montserrat400.className}> Smart access. Seamless research.</div>
    </div>
}
export default BannerContainer;