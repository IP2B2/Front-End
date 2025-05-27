"use client";
import Fragment, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Inter500, Inter400 } from "@/lib/fonts/Inter";

import styles from "./Sidebar.module.css";
import { AuthGetRoles } from "@/lib/logic/ApiCalls/AuthCalls";
import { redirectToLogin } from "@/lib/logic/RedirectLogin";

export default function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();
	// const isAdminPage = pathname === '/home/administrare'

	const [isAdmin, setIsAdmin] = useState(false);
	const [isCoordonator, setIsCoordonator] = useState(false);
	const [isStudent, setIsStudent] = useState(false);
	const [isResearcher, setIsResearcher] = useState(false);

	useEffect(() => {
		const rolesResolution = AuthGetRoles();
		console.log("Roles Resolution:", rolesResolution);
		if (rolesResolution.error) {
			redirectToLogin(router);
		}

		const roles = rolesResolution.payload || [];
		setIsAdmin(roles.includes("ADMIN"));
		setIsCoordonator(roles.includes("COORDONATOR"));
		setIsStudent(roles.includes("STUDENT"));
		setIsResearcher(roles.includes("RESEARCHER"));
	}, []);
	return (
		<aside className={styles.sidebar}>
			<div className={styles.sidebarContent}>
				<div className={styles.topSection}>
					<div className={styles.title}>
						<Image
							src="/IsmaBlack.svg"
							alt="ISMA Logo"
							width={160}
							height={53}
						/>
					</div>
					<hr className={styles.separator} />
					<nav className={`${styles.nav} ${Inter400.className}`}>
						<Link
							href="/home/"
							className={`${styles.navItem} ${
								pathname === "/" || pathname === "/home"
									? styles.active
									: ""
							}`}
						>
							<span>
								<Image
									src="/icons/mobilenav1.svg"
									alt="Home"
									width={16}
									height={16}
								/>
							</span>
							<span>Acasa</span>
						</Link>
						{isAdmin && <AdminRoutes />}
						{(isStudent || isResearcher) && <UserRoutes />}
						{isCoordonator && <CoordonatorRoutes />}
					</nav>
				</div>

				<div className={`${styles.userBox} ${Inter500.className}`}>
					<div className={styles.avatar}>AS</div>
					<span>Alex Serban</span>
				</div>
			</div>
		</aside>
	);
}

const AdminRoutes = () => {
	const pathname = usePathname();

	return (
		<>
			<Link
				href="/home/administrare"
				className={`${styles.navItem} ${styles.adminNavItem} ${
					pathname === "/home/administrare" ? styles.active : ""
				}`}
			>
				<span>
					<Image
						src="/icons/icon-administrare.svg"
						alt="Administrare"
						width={18}
						height={18}
					/>
				</span>
				<span>Administrare</span>
			</Link>
			<Link
				href="/home/administrare/echipamente"
				className={`${styles.navItem} ${styles.adminNavItem} ${
					pathname === "/home/administrare/echipamente"
						? styles.active
						: ""
				}`}
			>
				<span>
					<Image
						src="/icons/icon-administrare.svg"
						alt="Administrare"
						width={18}
						height={18}
					/>
				</span>
				<span>Admin Echipamente</span>
			</Link>
			<Link
				href="/home/administrare/utilizatori"
				className={`${styles.navItem} ${styles.adminNavItem} ${
					pathname === "/home/administrare/utilizatori"
						? styles.active
						: ""
				}`}
			>
				<span>
					<Image
						src="/icons/icon-administrare.svg"
						alt="Administrare"
						width={18}
						height={18}
					/>
				</span>
				<span>Admin Utilizatori</span>
			</Link>
		</>
	);
};

const UserRoutes = () => {
	const pathname = usePathname();

	return (
		<>
			<Link
				href="/home/echipamente"
				className={`${styles.navItem} ${
					pathname === "/home/echipamente"
						? styles.active
						: styles.inactive
				}`}
			>
				<span className={styles.icon}>
					<Image
						src="/icons/mobilenav2.svg"
						alt="Echipamente"
						width={16}
						height={16}
					/>
				</span>
				<span>Echipamente</span>
			</Link>

			<Link
				href="/home/cereri"
				className={`${styles.navItem} ${
					pathname === "/home/cereri"
						? styles.active
						: styles.inactive
				}`}
			>
				<span className={styles.icon}>
					<Image
						src="/icons/mobilenav3.svg"
						alt="Cereri"
						width={16}
						height={16}
					/>
				</span>
				<span>Cereri</span>
			</Link>
			<Link
				href="/profil"
				className={`${styles.navItem} ${
					pathname === "/profil" ? styles.active : styles.inactive
				}`}
			>
				<span className={styles.icon}>
					<Image
						src="/icons/mobilenav4.svg"
						alt="Profil"
						width={16}
						height={16}
					/>
				</span>
				<span>Profil</span>
			</Link>
		</>
	);
};

const CoordonatorRoutes = () => {
	const pathname = usePathname();

	return (
		<Link
			href="/home/coordonator/"
			className={`${styles.navItem} ${
				pathname === "/home/coordonator" ? styles.active : styles.inactive
			}`}
		>
			<span className={styles.icon}>
				<Image
					src="/icons/mobilenav3.svg"
					alt="Cereri"
					width={16}
					height={16}
				/>
			</span>
			<span>Cereri</span>
		</Link>
	);
};
