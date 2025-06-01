
import Image from 'next/image';

import { useState } from 'react';

import carouselStyles from './ProductImageCarousel.module.css';

export const ProductImageCarousel = ({ imageLinkArray }) => {
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
                    unoptimized
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
                            unoptimized
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}
export default ProductImageCarousel