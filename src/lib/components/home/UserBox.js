import Link from "next/link";
import Image from "next/image";

import styles from "./UserBox.module.css";
import { destroySession } from "@/lib/dal";

const UserBox = () => {
	const handleLogout = async () => {
		await destroySession();
	};

	return (
		<div className={styles.buttonWrapper}>
			<div onClick={handleLogout} className={styles.userBoxButton}>
				<Image
					src="/icons/buton-logout.svg"
					alt="Logout"
					width={40}
					height={40}
				/>
			</div>

			<Link href="/home" target="_blank" className={styles.userBoxButton}>
				<Image
					src="/icons/buton-info.svg"
					alt="Information"
					width={40}
					height={40}
				/>
			</Link>

			<Link href="/home" target="_blank" className={styles.userBoxButton}>
				<Image
					src="/icons/buton-user-name.svg"
					alt="User-name"
					width={40}
					height={40}
				/>
			</Link>
		</div>
	);
};
export default UserBox;
