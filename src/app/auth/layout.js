
import '@/app/globals.css'
import styles from './authLayout.module.css'

import BannerContainer from '@/lib/components/auth/authBannerContainer'


export default function AccountCreationLayout({ children }) {



    return <div className={styles.layoutContainer}>
        <BannerContainer />
        <main>
            {children}
        </main>
    </div>
}