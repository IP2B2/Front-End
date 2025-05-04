import React from 'react';
import styles from './Echipament.module.css';

export default function Echipament({ title, description, imageUrl }) {
    return (
        <div className={styles.echipamentCard}>
            <img src={imageUrl} alt={title} className={styles.echipamentImage} />
            <div className={styles.echipamentDetails}>
                <h2 className={styles.echipamentTitle}>{title}</h2>
                <p className={styles.echipamentDescription}>{description}</p>
            </div>
        </div>
    );
}