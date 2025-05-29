import Link from "next/link";

import "@/app/globals.css";
import styles from "./rootPage.module.css";
import BannerContainer from "@/lib/components/auth/authBannerContainer";


export default function RootHome() {

	return (
		<div className={styles.container}>
			<BannerContainer />
			<div className={styles.authButtonsContainer}>
				<Link href="/auth/login">
					<div className={styles.authButtonWrapper}>
						Autentificare
					</div>
				</Link>
				<Link href="/auth/register">
					<div className={styles.authButtonWrapper}>
						Inregistrare
					</div>
				</Link>
			</div>
		</div>
	);
}