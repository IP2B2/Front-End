'use client';
import '@/app/globals.css'
import styles from "./homeLayout.module.css"
import Head from 'next/head'
import Sidebar from '@/lib/components/home/Sidebar'
import MobileNavbar from '@/lib/components/home/MobileNavbar';
import TabletHeader from '@/lib/components/home/TabletHeader';
import { LayoutContentProvider } from '@/lib/context';
import { ShowDesktopOnly, ShowTabletStart } from '@/lib/components/globals/ResponsiveDivs';
import HomeHeader from '@/lib/components/home/HomeHeader';

import { useRootContext } from '@/lib/context/RootContext';

export default function HomeLayout({ children }) {

    const { showNavbar } = useRootContext();

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
                <HomeHeader />
                <div className={styles.contentWrapper}>
                    {children}
                </div>
                {showNavbar && <ShowTabletStart>
                    <MobileNavbar />
                </ShowTabletStart>}
            </div>
        </div>
        </LayoutContentProvider>
    );
}