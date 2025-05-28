import "@/app/globals.css";
import styles from "./rootPage.module.css";

import { useEffect } from "react";
import { useRootContext } from "@/lib/context/RootContext";

import Link from "next/link";

import getRoutes from "@/lib/getRoutes";

export default function RootHome() {

	return (
		<div className={styles.container}>
			TBD
		</div>
	);
}