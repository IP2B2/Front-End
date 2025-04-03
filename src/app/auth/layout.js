
import '@/app/globals.css'
import styles from './authLayout.module.css'
import Image from 'next/image';

import { InterHeading } from '@/lib/fonts/Inter'
import { Montserrat400 } from '@/lib/fonts/Montserrat';

export default function AccountCreationLayout(props) {
    return <div className={styles.layoutContainer}>
        <BannerContainer />
        <main>
            {props.children}
        </main>
    </div>
}

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