"use client";
import { useEffect, useState, cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Inter500, Inter400 } from "@/lib/fonts/Inter";

import styles from "./Sidebar.module.css";

import { verifySession } from "@/lib/dal";

export const Sidebar = cache(() => {
	const pathname = usePathname();

	const [isAdmin, setIsAdmin] = useState(false);
	const [isCoordonator, setIsCoordonator] = useState(false);
	const [isStudent, setIsStudent] = useState(false);
	const [isResearcher, setIsResearcher] = useState(false);

	const [username, setUsername] = useState("");

	useEffect(() => {
		const checkSession = cache(async () => {
			const session = await verifySession();

			const roles = session.roles || [];

			setUsername(session.username || "");

			setIsAdmin(roles.includes("ADMIN"));
			setIsCoordonator(roles.includes("COORDONATOR"));
			setIsStudent(roles.includes("STUDENT"));
			setIsResearcher(roles.includes("RESEARCHER"));
		});

		checkSession();
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
							href="/acasa/"
							className={`${styles.navItem} ${
								pathname === "/" || pathname === "/acasa"
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
					<div className={styles.avatar}>{username.length > 2 ? username[0] + username[1] : ""}</div>
					<span>{username}</span>
				</div>
			</div>
		</aside>
	);
})

export default Sidebar;

const AdminRoutes = () => {
	const pathname = usePathname();

	return (
		<>
			<Link
				href="/acasa/administrare"
				className={`${styles.navItem} ${styles.adminNavItem} ${
					pathname === "/acasa/administrare" ? styles.active : ""
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
				href="/acasa/administrare/echipamente"
				className={`${styles.navItem} ${styles.adminNavItem} ${
					pathname === "/acasa/administrare/echipamente"
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
				href="/acasa/administrare/utilizatori"
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
				href="/acasa/echipamente"
				className={`${styles.navItem} ${
					pathname === "/acasa/echipamente"
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
				href="/acasa/cereri"
				className={`${styles.navItem} ${
					pathname === "/acasa/cereri"
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
				href="/acasa/profile"
				className={`${styles.navItem} ${
					pathname === "/acasa/profile" ? styles.active : styles.inactive
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
			href="/acasa/coordonator/"
			className={`${styles.navItem} ${
				pathname === "/acasa/coordonator" ? styles.active : styles.inactive
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
