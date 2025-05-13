

import classPack from '@/lib/classPack';
import styles from './ResponsiveDivs.module.css';

export const ShowDesktopOnly = ({ children, className, style }) => {
    return (
        <div className={classPack(styles.showDesktopOnly, className)} style={style}>
            {children}
        </div>
    );
}

export const ShowTabletOnly = ({ children, className, style }) => {
    return (
        <div className={classPack(styles.showTabletOnly, className)} style={style}>
            {children}
        </div>
    );
}

export const ShowTabletStart = ({ children, className, style }) => {
    return (
        <div className={classPack(styles.showTabletStart, className)} style={style}>
            {children}
        </div>
    );
}

export const ShowMobileOnly = ({ children, className, style }) => {
    return (
        <div className={classPack(styles.showMobileOnly, className)} style={style}>
            {children}
        </div>
    );
}

export const ShowDesktopTablet = ({ children, className, style }) => {
    return (
        <div className={classPack(styles.showDesktopTablet, className)} style={style}>
            {children}
        </div>
    );
}