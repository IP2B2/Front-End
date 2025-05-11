'use client'

import Image from 'next/image';

import '@/app/globals.css'
import styles from './homePage.module.css'
import Breadcrumbs from './components/Breadcrumbs';
import { Montserrat300Italic, Montserrat500, Montserrat900 } from '@/lib/fonts/Montserrat';

import { useEffect } from 'react';
import { useLayoutContent } from '@/lib/context';
import { Calendar } from '@/lib/components/calendar/Calendar';

export default function Home() {

     const { setExtraContent } = useLayoutContent();
    useEffect(() => {
      setExtraContent({
        pageTitle: 'Acasa'
      });
      return () => setExtraContent({ pageTitle: '' }); // Cleanup when navigating away
    }, []);

    return (
        <div className={styles.homeContainer}>
            <div className={styles.statusCard}>Verificarea contului dumneavoastră este în curs. Vă mulțumim pentru înțelegere și răbdare!</div>
            <div className={styles.welcomeCard} style={{ display: 'none' }}>
                <div className={styles.welcomeMessage}>
                    <div className={Montserrat900.className}>Welcome to</div>
                    <div className={styles.showDesktop}><Image
                        src="/ISMA.svg"
                        width={350}
                        height={150}
                        alt="ISMA"
                    ></Image>
                    </div>
                    <div className={styles.showTablet}><Image
                        src="/ISMA.svg"
                        width={318}
                        height={94}
                        alt="ISMA"
                    ></Image>
                    </div>
                    <div className={styles.showMobile}><Image
                        src="/ISMA.svg"
                        width={270}
                        height={80}
                        alt="ISMA"
                    ></Image>
                    </div>
                </div>
                <div className={Montserrat500.className}>
                ISMA <div className={Montserrat300Italic.className}>centralizează procesele administrative legate de utilizarea echipamentelor științifice și tehnice. Principalul obiectiv este optimizarea accesului la echipamente și urmărirea trasabilității acestora printr-un sistem digital, intuitiv și structurat.</div>
                </div>
            </div>
            <Calendar />
        </div>
    );
}