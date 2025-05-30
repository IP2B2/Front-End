'use client'
import { useState } from 'react';
import styles from './Echipament.module.css';
import Image from 'next/image'
import { Inter500 } from '@/lib/fonts/Inter'
import '@/app/globals.css';
import carouselStyles from './ProductImageCarousel.module.css';
import { BackArrow } from '@/lib/components/globals/NavArrows';

export default function EchipamentPage() {
    
    const images = [
      "/icons/Frame 1000005448.svg", 
      "/icons/Frame 1000005450.svg",
      "/icons/Frame 1000005450.svg",
      "/icons/Frame 1000005450.svg"
    ];

    return (
    <div className={styles.layout}>
        <div className={styles.backButtonWrapper}>
            <BackArrow arrowSize={20} />
        </div>
        <ProductImageCarousel imageLinkArray={images} />

        <div className={styles.descriptionContainer}>
            <h1 className={styles.productTitle}>Prelungitor 20M cu mâner</h1>
            <div className={styles.pageDescription}>
            Prelungitor Cube, roz, 2 prize Schuko, cablu flexibil, design modern și compact, perfect pentru birou sau living. Soluție elegantă pentru conectarea dispozitivelor dumneavoastră, combinând funcționalitatea cu estetica contemporană.
            </div>
            <div className={styles.buttonGroup}>
                <button className={`${styles.actionButton} ${Inter500.className}`}>Vezi disponibilitate</button>
                <button className={`${styles.actionButton} ${Inter500.className}`}>Închiriază</button>
            </div>
            <div className={styles.dropdownsContainer}>
                <details className={styles.dropdown}>
                    <summary className={`${styles.dropdownHeader} ${Inter500.className}`}>Mod de utilizare</summary>
                    <div className={styles.dropdownContent}>
                    Conectați ștecherul prelungitorului Cube la priza de perete, apoi folosiți cele două prize Schuko pentru alimentarea dispozitivelor electrice. Datorită designului compact, poate fi așezat pe birou sau podea, iar cablul lung asigură flexibilitate în poziționare.
                    </div>
                </details>
                
                <details className={styles.dropdown}>
                    <summary className={`${styles.dropdownHeader} ${Inter500.className}`}>Material si intretinere</summary>
                    <div className={styles.dropdownContent}>
                    Fabricat din plastic ABS de înaltă calitate, rezistent la uzură și temperaturi ridicate. Carcasa cu finisaj mat împiedică acumularea amprentelor. Pentru întreținere, deconectați de la sursa de curent și ștergeți cu o cârpă uscată. Nu folosiți agenți de curățare lichizi sau abrazivi.
                    </div>
                </details>
            </div>
        </div>
    </div>
    );
}

export const ProductImageCarousel = ({ imageLinkArray }) => {
    console.log("Image Link Array:", imageLinkArray);
    const [selectedImage, setSelectedImage] = useState(0);
    
    return (
    <div className={carouselStyles.productImageSection}>
        <div className={carouselStyles.imageContainer}>
            <div className={carouselStyles.imageWrapper}>
                { imageLinkArray && <Image 
                    src={imageLinkArray[selectedImage] || "/icons/Frame 1000005450.svg"} 
                    alt="Prelungitor Gri" 
                    className={carouselStyles.image}
                    fill
                    sizes="860px"
                />}
                <div className={carouselStyles.overlay}>
                    <span className={carouselStyles.overlayText}>FEEA</span>
                </div>
            
                <div 
                    className={carouselStyles.navArrow + ' ' + carouselStyles.leftArrow} 
                    onClick={() => setSelectedImage(prevImage => (prevImage > 0 ? prevImage - 1 : imageLinkArray.length - 1))}
                >
                    <span>&#10094;</span>
                </div>
                
                <div 
                    className={carouselStyles.navArrow + ' ' + carouselStyles.rightArrow} 
                    onClick={() => setSelectedImage(prevImage => (prevImage < imageLinkArray.length - 1 ? prevImage + 1 : 0))}
                >
                    <span>&#10095;</span>
                </div>
            </div>
        </div>
        
        <div className={carouselStyles.carouselContainer}>
            <div className={carouselStyles.thumbnailsContainer}>
                {imageLinkArray?.filter(link => link != "").map((image, index) => (
                    <div 
                        key={index} 
                        className={`${carouselStyles.thumbnailWrapper} ${selectedImage === index ? carouselStyles.selectedThumbnail : ''}`}
                        onClick={() => setSelectedImage(index)}
                    >
                        <Image 
                            src={image || "/icons/Frame 1000005450.svg"} 
                            alt={`Thumbnail ${index + 1}`} 
                            className={carouselStyles.thumbnailImage}
                            width={70}
                            height={70}
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}