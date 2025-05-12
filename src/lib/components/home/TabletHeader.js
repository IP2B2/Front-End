

import Image from 'next/image'
import UserBox from './UserBox'

import styles from './TabletHeader.module.css'

const TabletHeader = () => {
    return (
        <div className={styles.headerContainer}>
            <Image
                src="/IsmaBlack.svg"
                width={200}
                height={76}
                alt="Project Logo"
            />
            <UserBox />
        </div>
    )
}

export default TabletHeader