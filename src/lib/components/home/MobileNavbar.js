"use client";
import { useState, useEffect, cache } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "./MobileNavbar.module.css";

import { verifySession } from "@/lib/dal";
import "@/app/globals.css";

const MobileNavbar = cache(() => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [isCoordonator, setIsCoordonator] = useState(false);
	const [isStudent, setIsStudent] = useState(false);
	const [isResearcher, setIsResearcher] = useState(false);

	useEffect(() => {
		const checkSession = cache(async () => {
			const session = await verifySession();

			const roles = session.roles || [];
			setIsAdmin(roles.includes("ADMIN"));
			setIsCoordonator(roles.includes("COORDONATOR"));
			setIsStudent(roles.includes("STUDENT"));
			setIsResearcher(roles.includes("RESEARCHER"));
		});

		checkSession();
	}, []);

	return (
		<div className={styles.container}>
			<Link href="/acasa/">
				<div className={styles.buttonWrapper}>
					<Image
						src="/icons/mobilenav1.svg"
						alt="home"
						fill
						sizes="(max-width: 680px) 37px, 60px"
					/>
				</div>
			</Link>
			{isAdmin && <AdminButtons />}
            {isCoordonator && <CoordonatorButtons />}
            {(isStudent || isResearcher) && <StudentButtons />}
            <Link href="/acasa/profile">
				<div className={styles.buttonWrapper}>
					<Image
						src="/icons/buton-user-name.svg"
						alt="home"
						fill
						sizes="(max-width: 680px) 37px, 60px"
					/>
				</div>
			</Link>
		</div>
	);
});

const AdminButtons = cache(() => {
	return (
		<>
			<Link href="/acasa/administrare/">
				<div className={styles.buttonWrapper}>
					<Image
						src="/icons/mobilenav2.svg"
						alt="list"
						fill
						sizes="(max-width: 680px) 37px, 60px"
					/>
				</div>
			</Link>
			<Link href="/acasa/administrare/echipamente/">
				<div className={styles.buttonWrapper}>
					<Image
						src="/icons/icon-administrare.svg"
						alt="add"
						fill
						sizes="(max-width: 680px) 37px, 60px"
					/>
				</div>
			</Link>
			<Link href="/acasa/administrare/utilizatori/">
				<div className={styles.buttonWrapper}>
					<Image
						src="/icons/icon-administrare.svg"
						alt="add"
						fill
						sizes="(max-width: 680px) 37px, 60px"
					/>
				</div>
			</Link>
		</>
	);
});

const CoordonatorButtons = cache(() => {
	return (
		<>
			<Link href="/acasa/coordonator">
				<div className={styles.buttonWrapper}>
					<Image
						src="/icons/mobilenav3.svg"
						alt="list"
						fill
						sizes="(max-width: 680px) 37px, 60px"
					/>
				</div>
			</Link>
		</>
	);
});

const StudentButtons = cache(() => {
	return (
		<>
			<Link href="/acasa/echipamente">
				<div className={styles.buttonWrapper}>
					<Image
						src="/icons/mobilenav2.svg"
						alt="requests"
						fill
						sizes="(max-width: 680px) 37px, 60px"
					/>
				</div>
			</Link>
			<Link href="/acasa/cereri">
				<div className={styles.buttonWrapper}>
					<Image
						src="/icons/mobilenav3.svg"
						alt="requests"
						fill
						sizes="(max-width: 680px) 37px, 60px"
					/>
				</div>
			</Link>
		</>
	);
});

export default MobileNavbar;
