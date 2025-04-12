
import '@/app/globals.css'
import styles from "./homeLayout.module.css"
import Head from 'next/head'
import Sidebar from '@/app/home/components/Sidebar'

export default function HomeLayout({ children }) {
    return (
        <div className={styles.layoutContainer}>
            <Head>
                <title>Acasa - Proiect IP</title>
            </Head>
            <Sidebar />
            <div className={styles.mainContainer}>
                {children}
            </div>
        </div>
    );
}