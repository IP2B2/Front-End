import styles from './Echipament.module.css';

export default function EchipamentPage() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.content}>
                <nav className={styles.breadcrumbs}>
                    <span className={styles.breadcrumbItem}>Home</span>
                    <span className={styles.separator}>/</span>
                    <span className={styles.breadcrumbItem}>Echipamente</span>
                    <span className={styles.separator}>/</span>
                    <span className={styles.breadcrumbActive}>Echipament</span>
                </nav>
                <div className={styles.pageTitle}>Prelungitor Gri</div>
                <div className={styles.layout}>
                    <div className={styles.pageDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    </div>
                    <div className={styles.imageContainer}>
                        <img
                            src="/icons/Frame 1000005448.svg"
                            alt="Prelungitor Gri"
                            className={styles.image}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}