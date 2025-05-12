
import '@/app/globals.css'
import styles from './rootPage.module.css'

import Link from 'next/link'

import routes from '@/lib/routes.js'

export default function RootHome() {
  return (
    <div className={styles.container}>
        <p>
            Link-uri importante sprint 1:
        </p>
        <ul className={styles.usefulLinksContainer}>
            {
                Object.keys(routes).map((key) => {
                    const route = routes[key];
                    return (
                        <li key={key}>
                            <Link href={route.route}>{route.title}</Link>
                        </li>
                    );
                })
            }
        </ul>
    </div>
  );
}
