

import Image from 'next/image'
import UserBox from './UserBox'

import styles from './TabletHeader.module.css'
import { ShowMobileOnly, ShowTabletOnly } from '../globals/ResponsiveDivs'

const TabletHeader = () => {
    return (
        <div className={styles.headerContainer}>
            <ShowTabletOnly>
                <Image
                    src="/IsmaBlack.svg"
                    width={200}
                    height={76}
                    alt="Project Logo"
                />
            </ShowTabletOnly>
            <ShowMobileOnly>
                <Image
                    src="/IsmaBlack.svg"
                    width={166}
                    height={63}
                    alt="Project Logo"
                />
            </ShowMobileOnly>
            <UserBox />
        </div>
    )
}

export default TabletHeader;