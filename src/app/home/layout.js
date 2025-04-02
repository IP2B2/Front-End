
import '@/app/globals.css'
import styles from "./homeLayout.module.css"
import Head from 'next/head'

import { InterHeading } from '@/lib/fonts/Inter'
import { HorizontalDivider } from '@/lib/components/Divider'

export default function HomeLayout(props) {
    return <div className={styles.layoutContainer}>
        <Head>
            <title>Acasa - Proiect IP</title>
        </Head>
        <SideBar />
        <div className={styles.mainContainer}>
            {props.children}
        </div>
    </div>
}

const SideBar = () => {
    return <div className={styles.sidebar + ' ' + 'border-rounded' + ' ' + 'border-gray'}>
        <div className={styles.sidebarTitle + ' ' + InterHeading}>Proiect IP</div>
        <HorizontalDivider />
        <div className={styles.sidebarUser + ' ' + 'border-rounded' + ' ' + 'border-gray'}>
            User
        </div>
    </div>
}