
import '@/app/globals.css'
import styles from './rootPage.module.css'

import Link from 'next/link'

export default function RootHome() {
  return (
    <div className={styles.container}>
        <p>
            Link-uri importante sprint 1:
        </p>
        <ul className={styles.usefulLinksContainer}>
            <li>
                <Link href='/auth/register'>Register</Link>
            </li>
            <li>
                <Link href='/auth/login'>Login</Link>
            </li>
            <li>
                <Link href='/auth/extra-data-required'>Extra data required</Link>
            </li>
            <li>
                <Link href='/home/'>Home/Landing page</Link>
            </li>
            <li>
                <Link href='/auth/confirm-mail'>Confirm Mail</Link>
            </li>
        </ul>
    </div>
  );
}
