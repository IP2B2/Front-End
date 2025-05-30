
import Image from 'next/image';

import { Montserrat400 } from '@/lib/fonts/Montserrat';

import '@/app/globals.css'
import styles from './authBannerContainer.module.css'

const BannerContainer = ({ keepWhite }) => {
    return (
    <div className={styles.bannerContainer}>
        <div className={styles.desktopWrapper}>
            <Image
                src="/ISMA.svg"
                width={400}
                height={152}
                alt="Project logo"
            />
                <div className={styles.bannerAppTitle + ' ' + Montserrat400.className}> Smart access. Seamless research.</div>
        </div>
        <div className={styles.tabletWrapper}>
            <Image
                    src={!keepWhite ? "/IsmaBlack.svg" : "/ISMA.svg"}
                    width={400}
                    height={152}
                    alt="Project Logo"
                />
        </div>
        <div className={styles.mobileWrapper}>
            <Image
                    src={!keepWhite ? "/IsmaBlack.svg" : "/ISMA.svg"}
                    width={200}
                    height={76}
                    alt="Project Logo"
                />
        </div>
    </div>
    )
}
export default BannerContainer;