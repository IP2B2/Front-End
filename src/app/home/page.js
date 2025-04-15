import '@/app/globals.css'
import styles from './homePage.module.css'
import Breadcrumbs from './components/Breadcrumbs';

export default function Home() {
    return (
        <>
         <Breadcrumbs page = "Acasa" />
         <h1 className={styles.pageTitle}>Acasa</h1>
        </>
    );
}