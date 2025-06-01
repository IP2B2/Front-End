
import Image from 'next/image';

import styles from './NavArrows.module.css';

import classPack from '@/lib/classPack';
import { useRouter } from 'next/navigation';

export const BackArrow = ({ onClick, className, style, arrowSize, backTo }) => {
    const router = useRouter();
    const handleGoBack = () => {
        if (backTo) {
            router.push(backTo);
            return;
        }
        router.back();
    };

    return (
        <div className={classPack(styles.backButtonWrapper, className)} onClick={onClick ? onClick : handleGoBack} style={style}>
            <Image
                src="/icons/back-arrow.svg"
                alt="Back"
                className={styles.backArrow}
                width={arrowSize ? arrowSize : 20}
                height={arrowSize ? arrowSize : 20}
            />
        </div>
    );
}