'use client'
import styles from './Echipament.module.css';
import UserBox from '../../components/UserBox';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Inter700, Inter500, Inter400 } from '@/lib/fonts/Inter'


export default function EchipamentPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
            <UserBox />
                
                <nav className={styles.breadcrumbs}>
                    <span className={styles.breadcrumbItem}>Home</span>
                    <Image 
                        src="/icons/slash-icon.svg" 
                        alt="separator" 
                        width={16} 
                        height={16} 
                        className={styles.separator}
                        />
                    <span className={styles.breadcrumbItem}>Echipamente</span>
                    <Image 
                        src="/icons/slash-icon.svg" 
                        alt="separator" 
                        width={16} 
                        height={16} 
                        className={styles.separator}
                        />
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
                    <div className={styles.descriptionContainer}>
                        <div className={styles.pageDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec ullamcorper diam, nec maximus lorem. Vivamus magna dolor, tristique vel elementum sit amet, dictum a dolor. Sed eget bibendum turpis. Nunc in mauris ut mauris pellentesque pulvinar. Integer efficitur vitae ligula ac egestas. Curabitur ultricies tincidunt erat dapibus porttitor. Pellentesque maximus aliquet elementum. Donec malesuada, enim at pulvinar interdum, nunc libero lacinia ante, id mattis mi sem ac neque. Cras ullamcorper, lacus sed sagittis consequat, velit odio rhoncus metus, vel blandit nisi leo et mi. Pellentesque a enim eu enim vestibulum ullamcorper non rutrum ex. Donec dolor ligula, gravida eget laoreet a, tempor at velit. Duis vel erat sed leo dignissim rutrum.
                        </div>
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