
import '@/app/globals.css'
import styles from './authLayout.module.css'

import BannerContainer from '@/lib/components/auth/authBannerContainer'
import { Suspense } from 'react'


export default function AccountCreationLayout({ children }) {



    return <div className={styles.layoutContainer}>
        <BannerContainer />
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </main>
    </div>
}