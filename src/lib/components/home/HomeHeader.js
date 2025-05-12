
import { useLayoutContent } from '@/lib/context'

import Breadcrumbs from './Breadcrumbs';
import UserBox from './UserBox'

import styles from './HomeHeader.module.css'

export default function HomeHeader() {
  const { extraContent } = useLayoutContent();

  return (
    <div className={styles.headerContainer}>
      <div>
        <Breadcrumbs />
        <div className={styles.pageTitle}>{extraContent?.pageTitle}</div>
      </div>
      <div className={styles.userBox}>
        <UserBox />
      </div>
    </div>
  );
}