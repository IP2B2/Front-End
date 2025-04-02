
import '@/app/globals.css'
import styles from './authLayout.module.css'

import { InterHeading } from '@/lib/fonts/Inter'

export default function AccountCreationLayout(props) {
    return <div className={styles.layoutContainer}>
        <main>
            {props.children}
        </main>
        <BannerContainer />
    </div>
}

const BannerContainer = () => {
    return <div className={styles.bannerContainer}>
            <div className={styles.bannerAppTitle + ' ' + InterHeading.className}>Proiect IP</div>
    </div>
}