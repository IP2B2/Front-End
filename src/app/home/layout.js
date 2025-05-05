'use client';
import '@/app/globals.css'
import styles from "./homeLayout.module.css"
import Head from 'next/head'
import Sidebar from '@/app/home/components/Sidebar'
import Breadcrumbs from '@/app/home/components/Breadcrumbs';
import MobileNavbar from './components/MobileNavbar';
import UserBox from './components/UserBox';
import TabletHeader from './components/TabletHeader';
import TabletBreadcrumbs from './components/TabletBreadcrumbs';
import { usePathname } from 'next/navigation';

export default function HomeLayout({ children }) {
    const pathname = usePathname();
  
    // Don't show breadcrumbs on the echipament page
    const showBreadcrumbs = !pathname.includes('/echipamente/echipament');
  
    return (
        <div className={styles.layoutContainer}>
            <Head>
                <title>Acasa - Proiect IP</title>
            </Head>
            <div className={styles.showDesktopOnly}>
                <Sidebar />
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.showDesktopOnly}>
                    {showBreadcrumbs && <Breadcrumbs page="Acasa" />}
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