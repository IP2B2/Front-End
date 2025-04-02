
import { InterHeading } from '@/lib/fonts/Inter'
import { HorizontalDivider } from '@/lib/components/globals/Divider'

import '@/app/globals.css'

import styles from './Sidebar.module.css'

const Sidebar = () => {
    return <div className={styles.sidebar + ' ' + 'border-rounded' + ' ' + 'border-gray'}>
        <div className={styles.sidebarTitle + ' ' + InterHeading}>Proiect IP</div>
        <HorizontalDivider />
        <div className={styles.sidebarUser + ' ' + 'border-rounded' + ' ' + 'border-gray'}>
            User
        </div>
    </div>
}
export default Sidebar;