'use client'
import styles from './Breadcrumbs.module.css'
import Image from 'next/image'

import UserBox from './UserBox'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react';
import { useLayoutContent } from '@/lib/context'

export default function Breadcrumbs({ page }) {
  const [breadcrumbs, setBreadCrumbs] = useState([]);
  const pathname = usePathname();

  const { extraContent } = useLayoutContent();

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    const adjustedPathSegments = pathSegments.length === 1 && pathSegments[0] === 'home' ? ['Acasa'] : pathSegments;
    setBreadCrumbs(adjustedPathSegments.filter(val => val != 'home').map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: '/' + pathSegments.slice(0, index + 1).join('/')
    })));
  }, [pathname]);
  

  return (
    <div className={styles.breadcrumbsContainer}>
      <div>
        <div className={styles.breadcrumbs}>
          <span className={styles.label}>Pagini</span>
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={index}>
              <Image
                src="/icons/slash-icon.svg"
                alt="/"
                width={16}
                height={16}
                className={styles.separator}
              />
              <span className={styles.breadcrumb}>{breadcrumb.name}</span>
            </span>
          ))}
        </div>
        <div className={styles.pageTitle}>{extraContent?.pageTitle}</div>
      </div>
    </div>
  );
}