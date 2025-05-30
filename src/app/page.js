'use client'

import { useEffect, useState } from "react";

import Link from "next/link";

import "@/app/globals.css";
import styles from "./rootPage.module.css";
import BannerContainer from "@/lib/components/auth/authBannerContainer";
import { isSession, destroySession } from "@/lib/dal";

export default function RootHome() {
	const [showLogin, setShowLogin] = useState(true);

	useEffect(() => {
		async function checkSession() {
			const sessionExists = await isSession();
			if (sessionExists) {
				setShowLogin(false);
			}
		}
		checkSession();
	}, []);

	const handleLogout = async () => {
		await destroySession();
	};

	return (
		<div className={styles.container}>
			<BannerContainer keepWhite={true} />

			<div className={styles.authButtonsContainer}>
				{showLogin ? (
					<>
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
					</>
				) : (
					<>
						<Link href="/home">
							<div className={styles.authButtonWrapper}>
								Acasa
							</div>
						</Link>
						<div
							onClick={handleLogout}
							className={styles.authButtonWrapper}
						>
							Deconectare
						</div>
					</>
				)}
			</div>
		</div>
	);
}
