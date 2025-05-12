'use client';
import '@/app/globals.css'
import styles from "./homeLayout.module.css"
import Head from 'next/head'
import Sidebar from '@/lib/components/home/Sidebar'
import Breadcrumbs from '@/lib/components/home/Breadcrumbs';
import MobileNavbar from '@/lib/components/home/MobileNavbar';
import UserBox from '@/lib/components/home/UserBox';
import TabletHeader from '@/lib/components/home/TabletHeader';
import TabletBreadcrumbs from '@/lib/components/home/TabletBreadcrumbs';
import { usePathname } from 'next/navigation';
import { LayoutContentProvider } from '@/lib/context';
import { SelectedDayProvider } from '@/lib/components/calendar/Calendar';
import { ShowDesktopOnly, ShowTabletStart } from '@/lib/components/globals/ResponsiveDivs';

export default function HomeLayout({ children }) {
    const pathname = usePathname();
    return (
        <LayoutContentProvider>
        <div className={styles.layoutContainer}>
            <Head>
                <title>Acasa - Proiect IP</title>
            </Head>
            <ShowDesktopOnly>
                <Sidebar />
            </ShowDesktopOnly>
            <ShowTabletStart>
                <TabletHeader />
            </ShowTabletStart>
            <div className={styles.mainContainer}>
                <ShowTabletStart style={{ padding: "5px 10px" }}>
                    <TabletBreadcrumbs/>
                </ShowTabletStart>
                <ShowDesktopOnly>
                    <Breadcrumbs/>
                </ShowDesktopOnly>
                
                <div className={styles.contentWrapper}>
                    {children}
                </div>
                <ShowTabletStart>
                    <MobileNavbar />
                </ShowTabletStart>
            </div>
        </div>
        </LayoutContentProvider>
    );
}