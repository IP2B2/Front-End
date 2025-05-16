import { useLayoutContent } from '@/lib/context'
import { usePathname } from 'next/navigation'

import Breadcrumbs from './Breadcrumbs';
import UserBox from './UserBox'

import styles from './HomeHeader.module.css'

export default function HomeHeader() {
  const { extraContent } = useLayoutContent();
  const pathname = usePathname();
  const isAdminPage = pathname === '/home/administrare';

  return (
    <div className={styles.headerContainer}>
      <div>
        <Breadcrumbs />
        {!isAdminPage && (
          <div className={styles.pageTitle}>{extraContent?.pageTitle}</div>
        )}
      </div>
      <div className={styles.userBox}>
        <UserBox />
      </div>
    </div>
  );
}