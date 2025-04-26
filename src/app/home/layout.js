
import '@/app/globals.css'
import styles from "./homeLayout.module.css"
import Head from 'next/head'
import Sidebar from '@/app/home/components/Sidebar'
import Breadcrumbs from '@/app/home/components/Breadcrumbs';
import MobileNavbar from './components/MobileNavbar';
import UserBox from './components/UserBox';
import TabletHeader from './components/TabletHeader';
import TabletBreadcrumbs from './components/TabletBreadcrumbs';

export default function HomeLayout({ children }) {
    return (
        <div className={styles.layoutContainer}>
            <Head>
                <title>Acasa - Proiect IP</title>
            </Head>
            <Sidebar />
            <div className={styles.mainContainer}>
                <div className={styles.showDesktop}>
                    <Breadcrumbs page = "Acasa" />
                </div>
                <div className={styles.showStartTablet}>
                    <TabletHeader />
                    <TabletBreadcrumbs page = "Acasa" />
                </div>
                {children}
                <div className={styles.showStartTablet}>
                    <MobileNavbar />
                </div>
            </div>
        </div>
    );
}