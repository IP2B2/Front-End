'use client'
import { useState, useEffect } from 'react';
import styles from './Echipament.module.css';
import Image from 'next/image'
import { Inter500 } from '@/lib/fonts/Inter'
import '@/app/globals.css';
import carouselStyles from './ProductImageCarousel.module.css';
import { BackArrow } from '@/lib/components/globals/NavArrows';
import { Calendar, SelectedDayProvider } from '@/lib/components/calendar/Calendar';
import { useRouter } from 'next/navigation';
import ResponseRegisteredSucc from '@/lib/components/popups/ResponseRegisteredSucc';

export default function EchipamentPage() {
    
    const images = [
      "/icons/Frame 1000005448.svg", 
      "/icons/Frame 1000005450.svg",
      "/icons/Frame 1000005450.svg",
      "/icons/Frame 1000005450.svg"
    ];
    const [showCalendar, setShowCalendar] = useState(false);
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const shouldShowPopup = localStorage.getItem('showSuccessPopup');
        if (shouldShowPopup === 'true') {
            setShowPopup(true);
            localStorage.removeItem('showSuccessPopup');
        }
    }, []);


    return (
    <div className={styles.layout}>
        <div className={styles.backButtonWrapper}>
            <BackArrow 
                arrowSize={20} 
                onClick={() => router.push('/home/administrare')}
            />
        </div>
        <ProductImageCarousel imageLinkArray={images} />

        <ResponseRegisteredSucc open={showPopup} onClose={() => setShowPopup(false)} />

        <div className={styles.descriptionContainer}>
            <h1 className={styles.productTitle}>Prelungitor 20M cu mâner</h1>
            <div className={styles.pageDescription}>
            Prelungitor Cube, roz, 2 prize Schuko, cablu flexibil, design modern și compact, perfect pentru birou sau living. Soluție elegantă pentru conectarea dispozitivelor dumneavoastră, combinând funcționalitatea cu estetica contemporană.
            </div>
            <div className={styles.buttonGroup}>
                <button
                    className={`${styles.actionButton} ${Inter500.className}`}
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    Vezi disponibilitate
                </button>

                <button 
                    className={`${styles.actionButton} ${Inter500.className}`}
                    onClick={() => router.push('/home/inchiriere/echipament-simplu')} //provizoriu
                            //o sa pun varianta pentru a ajunge si la celalalt formular
                >
                    Închiriază
                </button>
            </div>
            {showCalendar && (
                <div className={styles.calendarWrapper}>
                    <SelectedDayProvider>
                    <Calendar />
                    </SelectedDayProvider>
                </div>
                )}
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

const ProductImageCarousel = ({ imageLinkArray }) => {
    
    const [selectedImage, setSelectedImage] = useState(0);
    
    return (
    <div className={carouselStyles.productImageSection}>
        <div className={carouselStyles.imageContainer}>
            <div className={carouselStyles.imageWrapper}>
                <Image 
                    src={imageLinkArray[selectedImage]} 
                    alt="Prelungitor Gri" 
                    className={carouselStyles.image}
                    fill
                    sizes="(max-width: 860px) 860px, 400px"
                />
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
                {imageLinkArray.map((image, index) => (
                    <div 
                        key={index} 
                        className={`${carouselStyles.thumbnailWrapper} ${selectedImage === index ? carouselStyles.selectedThumbnail : ''}`}
                        onClick={() => setSelectedImage(index)}
                    >
                        <Image 
                            src={image} 
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