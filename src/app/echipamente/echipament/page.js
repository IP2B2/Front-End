'use client'
import styles from './Echipament.module.css';
import Sidebar from './Sidebar';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Inter700, Inter500, Inter400 } from '@/lib/fonts/Inter'

export default function EchipamentPage() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.content}>
                { }
                <div className={styles.headerActions}>
                   <Link href="/info" className={styles.headerButton} title="Info">
                        { }
                        <Image src="/icons/buton-info.svg" alt="Info" width={40} height={40} />
                    </Link>

                    <Link href="/auth/login" className={styles.headerButton} title="Logout">
                        { }
                        <Image src="/icons/buton-logout.svg" alt="Logout" width={40} height={40} />
                    </Link>

                    <Link href="/profil" className={styles.headerButton} title="Profil">
                        { }
                        <Image src="/icons/buton-user-name.svg" alt="Profil" width={40} height={40} />
                    </Link>
                   
                </div>

                <nav className={styles.breadcrumbs}>
                    <span className={styles.breadcrumbItem}>Home</span>
                    <span className={styles.separator}>/</span>
                    <span className={styles.breadcrumbItem}>Echipamente</span>
                    <span className={styles.separator}>/</span>
                    <span className={styles.breadcrumbActive}>Echipament</span>
                </nav>
                <div className={styles.pageTitle}>Prelungitor Gri</div>
                <div className={styles.layout}>
                    <div className={styles.imageContainer}>
                        <img
                            src="/icons/Frame 1000005448.svg"
                            alt="Prelungitor Gri"
                            className={styles.image}
                        />
                    </div>
                    { }
                    <div className={styles.descriptionContainer}>
                        <div className={styles.pageDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec ullamcorper diam, nec maximus lorem. Vivamus magna dolor, tristique vel elementum sit amet, dictum a dolor. Sed eget bibendum turpis. Nunc in mauris ut mauris pellentesque pulvinar. Integer efficitur vitae ligula ac egestas. Curabitur ultricies tincidunt erat dapibus porttitor. Pellentesque maximus aliquet elementum. Donec malesuada, enim at pulvinar interdum, nunc libero lacinia ante, id mattis mi sem ac neque. Cras ullamcorper, lacus sed sagittis consequat, velit odio rhoncus metus, vel blandit nisi leo et mi. Pellentesque a enim eu enim vestibulum ullamcorper non rutrum ex. Donec dolor ligula, gravida eget laoreet a, tempor at velit. Duis vel erat sed leo dignissim rutrum.
                        </div>
                        { }
                        <div className={styles.buttonGroup}>
                            <button className={styles.actionButton}>Vezi disponibilitate</button>
                            <button className={styles.actionButton}>Inchiriaza</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}